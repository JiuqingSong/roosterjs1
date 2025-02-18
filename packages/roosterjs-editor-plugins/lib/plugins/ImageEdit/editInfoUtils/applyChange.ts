import checkEditInfoState, { ImageEditInfoState } from './checkEditInfoState';
import generateDataURL from './generateDataURL';
import getGeneratedImageSize from './getGeneratedImageSize';
import ImageEditInfo from '../types/ImageEditInfo';
import { deleteEditInfo, getEditInfoFromImage, saveEditInfo } from './editInfo';
import { IEditor, PluginEventType } from 'roosterjs-editor-types';

/**
 * @internal
 * Apply changes from the edit info of an image, write result to the image
 * @param editor The editor object that contains the image
 * @param image The image to apply the change
 * @param editInfo Edit info that contains the changed information of the image
 * @param previousSrc Last src value of the image before the change was made
 * @returns True if the image is changed, otherwise false
 */
export default function applyChange(
    editor: IEditor,
    image: HTMLImageElement,
    editInfo: ImageEditInfo,
    previousSrc: string,
    wasResized: boolean
): boolean {
    let newSrc = '';

    const initEditInfo = getEditInfoFromImage(image);
    const state = checkEditInfoState(editInfo, initEditInfo);

    switch (state) {
        case ImageEditInfoState.ResizeOnly:
            // For resize only case, no need to generate a new image, just reuse the original one
            newSrc = editInfo.src;
            break;
        case ImageEditInfoState.SameWithLast:
            // For SameWithLast case, image may be resized but the content is still the same with last one,
            // so no need to create a new image, but just reuse last one
            newSrc = previousSrc;
            break;
        case ImageEditInfoState.FullyChanged:
            // For other cases (cropped, rotated, ...) we need to create a new image to reflect the change
            newSrc = generateDataURL(image, editInfo);
            break;
    }

    const srcChanged = newSrc != previousSrc;

    if (srcChanged) {
        // If the src is changed, fire an EditImage event so that plugins knows that a new image is used, and can
        // replace the new src with some other string and it will be used and set to the image
        const event = editor.triggerPluginEvent(PluginEventType.EditImage, {
            image: image,
            originalSrc: editInfo.src,
            previousSrc,
            newSrc,
        });
        newSrc = event.newSrc;
    }

    if (newSrc == editInfo.src) {
        // If newSrc is the same with original one, it means there is only size change, but no rotation, no cropping,
        // so we don't need to keep edit info, we can delete it
        deleteEditInfo(image);
    } else {
        // Otherwise, save the new edit info to the image so that next time when we edit the same image, we know
        // the edit info
        saveEditInfo(image, editInfo);
    }

    // Write back the change to image, and set its new size
    const { targetWidth, targetHeight } = getGeneratedImageSize(editInfo);
    image.src = newSrc;
    setImageSize(image, wasResized, targetWidth, targetHeight);

    return (
        srcChanged ||
        editInfo.widthPx != initEditInfo.widthPx ||
        editInfo.heightPx != initEditInfo.heightPx
    );
}

/**
 * @param img The current image.
 * @param wasResized the current resize state of the image
 */
function setImageSize(
    image: HTMLImageElement,
    wasResized: boolean,
    targetWidth: number,
    targetHeight: number
) {
    if (wasResized) {
        image.style.maxWidth = 'initial';
        image.width = targetWidth;
        image.height = targetHeight;
        image.style.width = targetWidth + 'px';
        image.style.height = targetHeight + 'px';
    } else {
        image.style.maxWidth = '100%';
        image.style.height = 'initial';
        image.style.width = 'initial';
        image.removeAttribute('height');
        image.removeAttribute('width');
    }
}
