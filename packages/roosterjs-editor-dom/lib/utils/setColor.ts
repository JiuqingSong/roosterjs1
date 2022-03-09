import { DarkModeDatasetNames, ModeIndependentColor } from 'roosterjs-editor-types';

const WHITE = '#ffffff';
const BLACK = '#000000';

//Using the HSL (hue, saturation and lightness) representation for RGB color values, if the value of the lightness is less than 20, the color is dark
const DARK_COLORS_LIGHTNESS = 20;
//If the value of the lightness is more than 80, the color is bright
const BRIGHT_COLORS_LIGHTNESS = 80;

/**
 * Set text color or background color to the given element
 * @param element The element to set color to
 * @param color The color to set, it can be a string of color name/value or a ModeIndependentColor object
 * @param isBackgroundColor Whether set background color or text color
 * @param isDarkMode Whether current mode is dark mode. @default false
 */
export default function setColor(
    element: HTMLElement,
    color: string | ModeIndependentColor,
    isBackgroundColor: boolean,
    isDarkMode?: boolean,
    shouldAdaptTheFontColor?: boolean
) {
    const colorString = typeof color === 'string' ? color.trim() : '';
    const modeIndependentColor = typeof color === 'string' ? null : color;

    if (colorString || modeIndependentColor) {
        element.style.setProperty(
            isBackgroundColor ? 'background-color' : 'color',
            (isDarkMode
                ? modeIndependentColor?.darkModeColor
                : modeIndependentColor?.lightModeColor) || colorString
        );
        adaptFontColorToBackgroundColor(element, isBackgroundColor && shouldAdaptTheFontColor);
        if (element.dataset) {
            const dataSetName = isBackgroundColor
                ? DarkModeDatasetNames.OriginalStyleBackgroundColor
                : DarkModeDatasetNames.OriginalStyleColor;
            if (!isDarkMode) {
                delete element.dataset[dataSetName];
            } else if (modeIndependentColor) {
                element.dataset[dataSetName] = modeIndependentColor.lightModeColor;
            }
        }
    }
}

/**
 * Change the font color to white or some other color, so the text can be visible with a darker background
 * @param element The element that contains text.
 * @param shouldAdaptTheFontColor if true it adapts the font color
 */
function adaptFontColorToBackgroundColor(element: HTMLElement, shouldAdaptTheFontColor?: boolean) {
    if (element.firstElementChild?.hasAttribute('style') || !shouldAdaptTheFontColor) {
        return;
    }
    const backgroundColor = element.style.getPropertyValue('background-color');
    if (!backgroundColor) {
        return;
    }
    if (isADarkOrBrightColor(backgroundColor) === true) {
        element.style.color = WHITE;
    } else if (isADarkOrBrightColor(backgroundColor) === false) {
        element.style.color = BLACK;
    }
}

function isADarkOrBrightColor(color: string): boolean | null {
    let lightness = calculateLightness(color);
    if (lightness < DARK_COLORS_LIGHTNESS) {
        return true;
    } else if (lightness > BRIGHT_COLORS_LIGHTNESS) {
        return false;
    }
    return null;
}

/**
 * Calculate the lightness of HSL (hue, saturation and lightness) representation
 * @param color a RBG COLOR
 * @returns
 */
function calculateLightness(color: string) {
    let [r, g, b] = color.match(/[\d\.]+/g) as RegExpMatchArray;
    // Use the values of r,g,b to calculate the lightness in the HSl representation
    //First calculate the fraction of the light in each color, since in css the value of r,g,b is in the interval of [0,255], we have
    const red = parseInt(r) / 255;
    const green = parseInt(g) / 255;
    const blue = parseInt(b) / 255;
    //Then the lightness in the HSL representation is the average between maximum fraction of r,g,b and the minimum fraction
    return (Math.max(red, green, blue) + Math.min(red, green, blue)) * (1 / 2) * 100;
}
