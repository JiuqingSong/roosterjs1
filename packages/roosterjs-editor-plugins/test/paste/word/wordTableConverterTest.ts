import * as TestHelper from 'roosterjs-editor-api/test/TestHelper';
import Paste from '../../../lib/plugins/Paste/Paste';
import { ClipboardData, IEditor } from 'roosterjs-editor-types';

const TEST_ID = 'wordTable';
const WORD_ONLINE_TABLE_STYLE = 'data-tablestyle';
describe('wordTableConverter', () => {
    let editor: IEditor;
    const pluglin = new Paste();

    beforeEach(() => {
        editor = TestHelper.initEditor(TEST_ID, [pluglin]);
    });

    afterEach(() => {
        editor.dispose();
        TestHelper.removeElement(TEST_ID);
    });

    // const wordTable =
    //     '<table style="margin: 0px; user-select: text; table-layout: fixed; width: 0px; border-collapse: collapse; color: rgb(255, 255, 255) !important; font-family: &quot;Segoe UI&quot;, &quot;Segoe UI Web&quot;, Arial, Verdana, sans-serif; font-size: 12px; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgba(255, 255, 255, 0) !important; border-spacing: 0px;" data-tablelook="1696" data-tablestyle="MsoTable15List2Accent5" data-ogsc="rgb(0, 0, 0)" data-ogsb="transparent"><tbody style="margin:0px;user-select:text"><tr style="margin:0px;user-select:text;height:0px"><td style="margin:0px;user-select:text;vertical-align:top;border-color:var(--clrTableAccent5, #9cc2e5);border-width:1px 0px;border-style:solid none;width:300px" data-celllook="0"><div style="margin:0px;padding:0px 7px;user-select:text"><div style="margin:0px;user-select:text;cursor:text;clear:both"><p style="margin: 0px; user-select: text; overflow-wrap: break-word; white-space: pre-wrap; font-weight: bold; font-kerning: none; color: windowtext !important; text-align: left;" lang="PT-BR" data-ogsc="windowtext"><span style="margin:0px;user-select:text;font-variant-ligatures:none !important;font-size:11pt;line-height:18.3458px;font-family:Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif" lang="PT-BR" data-contrast="auto"><span style="margin:0px;user-select:text;background-repeat:repeat-x;background-position:left bottom;background-image:var(--urlSpellingErrorV2,url(&quot;data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNXB4IiBoZWlnaHQ9IjRweCIgdmlld0JveD0iMCAwIDUgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTYuMiAoODE2NzIpIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPnNwZWxsaW5nX3NxdWlnZ2xlPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkZsYWdzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTAxMC4wMDAwMDAsIC0yOTYuMDAwMDAwKSIgaWQ9InNwZWxsaW5nX3NxdWlnZ2xlIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAxMC4wMDAwMDAsIDI5Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDMgQzEuMjUsMyAxLjI1LDEgMi41LDEgQzMuNzUsMSAzLjc1LDMgNSwzIiBpZD0iUGF0aCIgc3Ryb2tlPSIjRUIwMDAwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIHg9IjAiIHk9IjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjQiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+&quot;):base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNXB4IiBoZWlnaHQ9IjRweCIgdmlld0JveD0iMCAwIDUgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTYuMiAoODE2NzIpIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPnNwZWxsaW5nX3NxdWlnZ2xlPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkZsYWdzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTAxMC4wMDAwMDAsIC0yOTYuMDAwMDAwKSIgaWQ9InNwZWxsaW5nX3NxdWlnZ2xlIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAxMC4wMDAwMDAsIDI5Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDMgQzEuMjUsMyAxLjI1LDEgMi41LDEgQzMuNzUsMSAzLjc1LDMgNSwzIiBpZD0iUGF0aCIgc3Ryb2tlPSIjRUIwMDAwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIHg9IjAiIHk9IjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjQiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+&quot;));border-bottom:1px solid transparent">rdrewr</span></span><span style="margin:0px;user-select:text;font-size:11pt;line-height:18.3458px;font-family:Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif" data-ccp-props="{&quot;201341983&quot;:0,&quot;335559740&quot;:259}">&nbsp;</span></p></div></div></td><td style="margin:0px;user-select:text;vertical-align:top;border-color:var(--clrTableAccent5, #9cc2e5);border-width:1px 0px;border-style:solid none;width:300px" data-celllook="0"><div style="margin:0px;padding:0px 7px;user-select:text"><div style="margin:0px;user-select:text;cursor:text;clear:both"><p style="margin: 0px; user-select: text; overflow-wrap: break-word; white-space: pre-wrap; font-weight: bold; font-kerning: none; color: windowtext !important; text-align: left;" lang="PT-BR" data-ogsc="windowtext"><span style="margin:0px;user-select:text;font-variant-ligatures:none !important;font-size:11pt;line-height:18.3458px;font-family:Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif" lang="PT-BR" data-contrast="auto"><span style="margin:0px;user-select:text"></span></span><span style="margin:0px;user-select:text;font-size:11pt;line-height:18.3458px;font-family:Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif" data-ccp-props="{&quot;201341983&quot;:0,&quot;335559740&quot;:259}">&nbsp;</span></p></div></div></td></tr><tr style="margin:0px;user-select:text;height:0px"><td style="margin:0px;user-select:text;vertical-align:top;border-color:var(--clrTableAccent5, #9cc2e5);border-width:0px 0px 1px;border-style:none none solid;width:300px" data-celllook="0"><div style="margin:0px;padding:0px 7px;user-select:text"><div style="margin:0px;user-select:text;cursor:text;clear:both"><p style="margin: 0px; user-select: text; overflow-wrap: break-word; white-space: pre-wrap; font-weight: bold; font-kerning: none; color: windowtext !important; text-align: left;" lang="PT-BR" data-ogsc="windowtext"><span style="margin:0px;user-select:text;font-variant-ligatures:none !important;font-size:11pt;line-height:18.3458px;font-family:Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif" lang="PT-BR" data-contrast="auto"><span style="margin:0px;user-select:text;background-repeat:repeat-x;background-position:left bottom;background-image:var(--urlSpellingErrorV2,url(&quot;data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNXB4IiBoZWlnaHQ9IjRweCIgdmlld0JveD0iMCAwIDUgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTYuMiAoODE2NzIpIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPnNwZWxsaW5nX3NxdWlnZ2xlPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkZsYWdzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTAxMC4wMDAwMDAsIC0yOTYuMDAwMDAwKSIgaWQ9InNwZWxsaW5nX3NxdWlnZ2xlIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAxMC4wMDAwMDAsIDI5Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDMgQzEuMjUsMyAxLjI1LDEgMi41LDEgQzMuNzUsMSAzLjc1LDMgNSwzIiBpZD0iUGF0aCIgc3Ryb2tlPSIjRUIwMDAwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIHg9IjAiIHk9IjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjQiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+&quot;):base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNXB4IiBoZWlnaHQ9IjRweCIgdmlld0JveD0iMCAwIDUgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTYuMiAoODE2NzIpIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPnNwZWxsaW5nX3NxdWlnZ2xlPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkZsYWdzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTAxMC4wMDAwMDAsIC0yOTYuMDAwMDAwKSIgaWQ9InNwZWxsaW5nX3NxdWlnZ2xlIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAxMC4wMDAwMDAsIDI5Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDMgQzEuMjUsMyAxLjI1LDEgMi41LDEgQzMuNzUsMSAzLjc1LDMgNSwzIiBpZD0iUGF0aCIgc3Ryb2tlPSIjRUIwMDAwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIHg9IjAiIHk9IjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjQiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+&quot;));border-bottom:1px solid transparent">rewrwerwer</span></span><span style="margin:0px;user-select:text;font-size:11pt;line-height:18.3458px;font-family:Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif" data-ccp-props="{&quot;201341983&quot;:0,&quot;335559740&quot;:259}">&nbsp;</span></p></div></div></td><td style="margin:0px;user-select:text;vertical-align:top;border-color:var(--clrTableAccent5, #9cc2e5);border-width:0px 0px 1px;border-style:none none solid;width:300px" data-celllook="0"><div style="margin:0px;padding:0px 7px;user-select:text"><div style="margin:0px;user-select:text;cursor:text;clear:both"><p style="margin: 0px; user-select: text; overflow-wrap: break-word; white-space: pre-wrap; font-weight: normal; font-kerning: none; color: windowtext !important; text-align: left;" lang="PT-BR" data-ogsc="windowtext"><span style="margin:0px;user-select:text;font-variant-ligatures:none !important;font-size:11pt;line-height:18.3458px;font-family:Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif" lang="PT-BR" data-contrast="auto"><span style="margin:0px;user-select:text"></span></span><span style="margin:0px;user-select:text;font-size:11pt;line-height:18.3458px;font-family:Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif" data-ccp-props="{&quot;201341983&quot;:0,&quot;335559740&quot;:259}">&nbsp;</span></p></div></div></td></tr></tbody></table>';
    const expectedTable =
        '<table style="margin: 0px; user-select: text; table-layout: fixed; width: 0px; border-collapse: collapse; color: rgb(255, 255, 255) !important; font-family: &quot;Segoe UI&quot;, &quot;Segoe UI Web&quot;, Arial, Verdana, sans-serif; font-size: 12px; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgba(255, 255, 255, 0) !important; border-spacing: 0px;" data-tablelook="1696" data-tablestyle="MsoTable15List2Accent5" data-ogsc="rgb(0, 0, 0)" data-ogsb="transparent"><tbody style="margin:0px;user-select:text"><tr style="margin:0px;user-select:text;height:0px"><td style="margin:0px;user-select:text;vertical-align:top;border-color:var(--clrTableAccent5, #9cc2e5);border-width:1px 0px;border-style:solid none;width:300px" data-celllook="0"><div style="margin:0px;padding:0px 7px;user-select:text"><div style="margin:0px;user-select:text;cursor:text;clear:both"><p style="margin:0px;user-select:text;overflow-wrap:break-word;white-space:pre-wrap;font-weight:bold;font-kerning:none;text-align:left" lang="PT-BR"><span style="margin:0px;user-select:text;font-variant-ligatures:none !important;font-size:11pt;line-height:18.3458px;font-family:Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif" lang="PT-BR" data-contrast="auto"><span style="margin:0px;user-select:text;background-repeat:repeat-x;background-position:left bottom;background-image:var(--urlSpellingErrorV2,url(&quot;data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNXB4IiBoZWlnaHQ9IjRweCIgdmlld0JveD0iMCAwIDUgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTYuMiAoODE2NzIpIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPnNwZWxsaW5nX3NxdWlnZ2xlPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkZsYWdzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTAxMC4wMDAwMDAsIC0yOTYuMDAwMDAwKSIgaWQ9InNwZWxsaW5nX3NxdWlnZ2xlIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAxMC4wMDAwMDAsIDI5Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDMgQzEuMjUsMyAxLjI1LDEgMi41LDEgQzMuNzUsMSAzLjc1LDMgNSwzIiBpZD0iUGF0aCIgc3Ryb2tlPSIjRUIwMDAwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIHg9IjAiIHk9IjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjQiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+&quot;):base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNXB4IiBoZWlnaHQ9IjRweCIgdmlld0JveD0iMCAwIDUgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTYuMiAoODE2NzIpIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPnNwZWxsaW5nX3NxdWlnZ2xlPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkZsYWdzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTAxMC4wMDAwMDAsIC0yOTYuMDAwMDAwKSIgaWQ9InNwZWxsaW5nX3NxdWlnZ2xlIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAxMC4wMDAwMDAsIDI5Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDMgQzEuMjUsMyAxLjI1LDEgMi41LDEgQzMuNzUsMSAzLjc1LDMgNSwzIiBpZD0iUGF0aCIgc3Ryb2tlPSIjRUIwMDAwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIHg9IjAiIHk9IjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjQiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+&quot;));border-bottom:1px solid transparent">rdrewr</span></span><span style="margin:0px;user-select:text;font-size:11pt;line-height:18.3458px;font-family:Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif" data-ccp-props="{&quot;201341983&quot;:0,&quot;335559740&quot;:259}">&nbsp;</span></p></div></div></td><td style="margin:0px;user-select:text;vertical-align:top;border-color:var(--clrTableAccent5, #9cc2e5);border-width:1px 0px;border-style:solid none;width:300px" data-celllook="0"><div style="margin:0px;padding:0px 7px;user-select:text"><div style="margin:0px;user-select:text;cursor:text;clear:both"><p style="margin:0px;user-select:text;overflow-wrap:break-word;white-space:pre-wrap;font-weight:bold;font-kerning:none;text-align:left" lang="PT-BR"><span style="margin:0px;user-select:text;font-variant-ligatures:none !important;font-size:11pt;line-height:18.3458px;font-family:Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif" lang="PT-BR" data-contrast="auto"><span style="margin:0px;user-select:text"></span></span><span style="margin:0px;user-select:text;font-size:11pt;line-height:18.3458px;font-family:Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif" data-ccp-props="{&quot;201341983&quot;:0,&quot;335559740&quot;:259}">&nbsp;</span></p></div></div></td></tr><tr style="margin:0px;user-select:text;height:0px"><td style="margin:0px;user-select:text;vertical-align:top;border-color:var(--clrTableAccent5, #9cc2e5);border-width:0px 0px 1px;border-style:none none solid;width:300px" data-celllook="0"><div style="margin:0px;padding:0px 7px;user-select:text"><div style="margin:0px;user-select:text;cursor:text;clear:both"><p style="margin:0px;user-select:text;overflow-wrap:break-word;white-space:pre-wrap;font-weight:bold;font-kerning:none;text-align:left" lang="PT-BR"><span style="margin:0px;user-select:text;font-variant-ligatures:none !important;font-size:11pt;line-height:18.3458px;font-family:Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif" lang="PT-BR" data-contrast="auto"><span style="margin:0px;user-select:text;background-repeat:repeat-x;background-position:left bottom;background-image:var(--urlSpellingErrorV2,url(&quot;data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNXB4IiBoZWlnaHQ9IjRweCIgdmlld0JveD0iMCAwIDUgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTYuMiAoODE2NzIpIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPnNwZWxsaW5nX3NxdWlnZ2xlPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkZsYWdzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTAxMC4wMDAwMDAsIC0yOTYuMDAwMDAwKSIgaWQ9InNwZWxsaW5nX3NxdWlnZ2xlIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAxMC4wMDAwMDAsIDI5Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDMgQzEuMjUsMyAxLjI1LDEgMi41LDEgQzMuNzUsMSAzLjc1LDMgNSwzIiBpZD0iUGF0aCIgc3Ryb2tlPSIjRUIwMDAwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIHg9IjAiIHk9IjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjQiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+&quot;):base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNXB4IiBoZWlnaHQ9IjRweCIgdmlld0JveD0iMCAwIDUgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTYuMiAoODE2NzIpIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPnNwZWxsaW5nX3NxdWlnZ2xlPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkZsYWdzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTAxMC4wMDAwMDAsIC0yOTYuMDAwMDAwKSIgaWQ9InNwZWxsaW5nX3NxdWlnZ2xlIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAxMC4wMDAwMDAsIDI5Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDMgQzEuMjUsMyAxLjI1LDEgMi41LDEgQzMuNzUsMSAzLjc1LDMgNSwzIiBpZD0iUGF0aCIgc3Ryb2tlPSIjRUIwMDAwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIHg9IjAiIHk9IjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjQiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+&quot;));border-bottom:1px solid transparent">rewrwerwer</span></span><span style="margin:0px;user-select:text;font-size:11pt;line-height:18.3458px;font-family:Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif" data-ccp-props="{&quot;201341983&quot;:0,&quot;335559740&quot;:259}">&nbsp;</span></p></div></div></td><td style="margin:0px;user-select:text;vertical-align:top;border-color:var(--clrTableAccent5, #9cc2e5);border-width:0px 0px 1px;border-style:none none solid;width:300px" data-celllook="0"><div style="margin:0px;padding:0px 7px;user-select:text"><div style="margin:0px;user-select:text;cursor:text;clear:both"><p style="margin:0px;user-select:text;overflow-wrap:break-word;white-space:pre-wrap;font-weight:normal;font-kerning:none;text-align:left" lang="PT-BR"><span style="margin:0px;user-select:text;font-variant-ligatures:none !important;font-size:11pt;line-height:18.3458px;font-family:Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif" lang="PT-BR" data-contrast="auto"><span style="margin:0px;user-select:text"></span></span><span style="margin:0px;user-select:text;font-size:11pt;line-height:18.3458px;font-family:Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif" data-ccp-props="{&quot;201341983&quot;:0,&quot;335559740&quot;:259}">&nbsp;</span></p></div></div></td></tr></tbody></table>';
    function runTest(expectedTable: string) {
        const range = document.createRange();
        spyOn(editor, 'getSelectionRange').and.returnValue(range);
        const clipboard: ClipboardData = {
            types: ['text/plain', 'text/html'],
            text: '\nrdrewr \n\n \n\nrewrwerwer \n\n \n\n',
            image: null,
            files: [],
            rawHtml:
                '<meta charset=\'utf-8\'><table class="Table Ltr TableNoGrid ListTable2 Accent5 TransparentBackgroundColor TableWordWrap SCXW198931361 BCX0" border="1" data-tablestyle="MsoTable15List2Accent5" data-tablelook="1696" aria-rowcount="2" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; table-layout: fixed; width: 0px; overflow: visible; border-collapse: collapse; empty-cells: show; position: relative; color: rgb(0, 0, 0); font-family: &quot;Segoe UI&quot;, &quot;Segoe UI Web&quot;, Arial, Verdana, sans-serif; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background: transparent; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; border-spacing: 0px;"><tbody class="SCXW198931361 BCX0" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent;"><tr class="TableRow SCXW198931361 BCX0" role="row" aria-rowindex="1" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow: visible; height: 0px;"><td class="FirstRow FirstCol SCXW198931361 BCX0" role="rowheader" data-celllook="0" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; vertical-align: top; overflow: visible; border-color: var(--clrTableAccent5, #9cc2e5); background-color: transparent; border-width: 1px 0px; border-style: solid none; width: 300px;"><div class="TableCellContent SCXW198931361 BCX0" style="margin: 0px; padding: 0px 7px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow: visible;"><div class="OutlineElement Ltr SCXW198931361 BCX0" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow: visible; cursor: text; clear: both; position: relative; direction: ltr;"><p class="Paragraph SCXW198931361 BCX0" xml:lang="PT-BR" lang="PT-BR" paraid="1028822933" paraeid="{00122c90-47e1-48da-9886-74a84e39c8b3}{118}" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow-wrap: break-word; white-space: pre-wrap; font-weight: bold; font-style: normal; vertical-align: baseline; font-kerning: none; background-color: transparent; color: windowtext; text-align: left; text-indent: 0px;"><span data-contrast="auto" xml:lang="PT-BR" lang="PT-BR" class="TextRun MacChromeBold SCXW198931361 BCX0" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; -webkit-font-smoothing: antialiased; font-variant-ligatures: none !important; font-size: 11pt; line-height: 18.3458px; font-family: Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif; font-weight: bold;"><span class="NormalTextRun SpellingErrorV2Themed SCXW198931361 BCX0" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; background-repeat: repeat-x; background-position: left bottom; background-image: var(--urlSpellingErrorV2,url(&quot;data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNXB4IiBoZWlnaHQ9IjRweCIgdmlld0JveD0iMCAwIDUgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTYuMiAoODE2NzIpIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPnNwZWxsaW5nX3NxdWlnZ2xlPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkZsYWdzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTAxMC4wMDAwMDAsIC0yOTYuMDAwMDAwKSIgaWQ9InNwZWxsaW5nX3NxdWlnZ2xlIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAxMC4wMDAwMDAsIDI5Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDMgQzEuMjUsMyAxLjI1LDEgMi41LDEgQzMuNzUsMSAzLjc1LDMgNSwzIiBpZD0iUGF0aCIgc3Ryb2tlPSIjRUIwMDAwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIHg9IjAiIHk9IjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjQiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+&quot;)); border-bottom: 1px solid transparent;">rdrewr</span></span><span class="EOP SCXW198931361 BCX0" data-ccp-props="{&quot;201341983&quot;:0,&quot;335559740&quot;:259}" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; font-size: 11pt; line-height: 18.3458px; font-family: Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif;"> </span></p></div></div></td><td class="FirstRow LastCol SCXW198931361 BCX0" role="columnheader" data-celllook="0" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; vertical-align: top; overflow: visible; border-color: var(--clrTableAccent5, #9cc2e5); background-color: transparent; border-width: 1px 0px; border-style: solid none; width: 300px;"><div class="TableCellContent SCXW198931361 BCX0" style="margin: 0px; padding: 0px 7px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow: visible;"><div class="OutlineElement Ltr SCXW198931361 BCX0" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow: visible; cursor: text; clear: both; position: relative; direction: ltr;"><p class="Paragraph SCXW198931361 BCX0" xml:lang="PT-BR" lang="PT-BR" paraid="755414210" paraeid="{00122c90-47e1-48da-9886-74a84e39c8b3}{124}" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow-wrap: break-word; white-space: pre-wrap; font-weight: bold; font-style: normal; vertical-align: baseline; font-kerning: none; background-color: transparent; color: windowtext; text-align: left; text-indent: 0px;"><span data-contrast="auto" xml:lang="PT-BR" lang="PT-BR" class="TextRun MacChromeBold SCXW198931361 BCX0" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; -webkit-font-smoothing: antialiased; font-variant-ligatures: none !important; font-size: 11pt; line-height: 18.3458px; font-family: Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif; font-weight: bold;"><span class="NormalTextRun SCXW198931361 BCX0" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent;"></span></span><span class="EOP SCXW198931361 BCX0" data-ccp-props="{&quot;201341983&quot;:0,&quot;335559740&quot;:259}" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; font-size: 11pt; line-height: 18.3458px; font-family: Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif;"> </span></p></div></div></td></tr><tr class="TableRow SCXW198931361 BCX0" role="row" aria-rowindex="2" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow: visible; height: 0px;"><td class="FirstCol LastRow SCXW198931361 BCX0" role="rowheader" data-celllook="0" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; vertical-align: top; overflow: visible; border-color: var(--clrTableAccent5, #9cc2e5); background-color: transparent; border-width: 0px 0px 1px; border-style: none none solid; width: 300px;"><div class="TableCellContent SCXW198931361 BCX0" style="margin: 0px; padding: 0px 7px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow: visible;"><div class="OutlineElement Ltr SCXW198931361 BCX0" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow: visible; cursor: text; clear: both; position: relative; direction: ltr;"><p class="Paragraph SCXW198931361 BCX0" xml:lang="PT-BR" lang="PT-BR" paraid="282297629" paraeid="{00122c90-47e1-48da-9886-74a84e39c8b3}{130}" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow-wrap: break-word; white-space: pre-wrap; font-weight: bold; font-style: normal; vertical-align: baseline; font-kerning: none; background-color: transparent; color: windowtext; text-align: left; text-indent: 0px;"><span data-contrast="auto" xml:lang="PT-BR" lang="PT-BR" class="TextRun MacChromeBold SCXW198931361 BCX0" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; -webkit-font-smoothing: antialiased; font-variant-ligatures: none !important; font-size: 11pt; line-height: 18.3458px; font-family: Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif; font-weight: bold;"><span class="NormalTextRun SpellingErrorV2Themed SCXW198931361 BCX0" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; background-repeat: repeat-x; background-position: left bottom; background-image: var(--urlSpellingErrorV2,url(&quot;data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNXB4IiBoZWlnaHQ9IjRweCIgdmlld0JveD0iMCAwIDUgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggNTYuMiAoODE2NzIpIC0gaHR0cHM6Ly9za2V0Y2guY29tIC0tPgogICAgPHRpdGxlPnNwZWxsaW5nX3NxdWlnZ2xlPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9IkZsYWdzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTAxMC4wMDAwMDAsIC0yOTYuMDAwMDAwKSIgaWQ9InNwZWxsaW5nX3NxdWlnZ2xlIj4KICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAxMC4wMDAwMDAsIDI5Ni4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLDMgQzEuMjUsMyAxLjI1LDEgMi41LDEgQzMuNzUsMSAzLjc1LDMgNSwzIiBpZD0iUGF0aCIgc3Ryb2tlPSIjRUIwMDAwIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIHg9IjAiIHk9IjAiIHdpZHRoPSI1IiBoZWlnaHQ9IjQiPjwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+&quot;)); border-bottom: 1px solid transparent;">rewrwerwer</span></span><span class="EOP SCXW198931361 BCX0" data-ccp-props="{&quot;201341983&quot;:0,&quot;335559740&quot;:259}" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; font-size: 11pt; line-height: 18.3458px; font-family: Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif;"> </span></p></div></div></td><td class="LastCol LastRow SCXW198931361 BCX0" data-celllook="0" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; vertical-align: top; overflow: visible; border-color: var(--clrTableAccent5, #9cc2e5); background-color: transparent; border-width: 0px 0px 1px; border-style: none none solid; width: 300px;"><div class="TableCellContent SCXW198931361 BCX0" style="margin: 0px; padding: 0px 7px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow: visible;"><div class="OutlineElement Ltr SCXW198931361 BCX0" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow: visible; cursor: text; clear: both; position: relative; direction: ltr;"><p class="Paragraph SCXW198931361 BCX0" xml:lang="PT-BR" lang="PT-BR" paraid="425920290" paraeid="{00122c90-47e1-48da-9886-74a84e39c8b3}{134}" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; overflow-wrap: break-word; white-space: pre-wrap; font-weight: normal; font-style: normal; vertical-align: baseline; font-kerning: none; background-color: transparent; color: windowtext; text-align: left; text-indent: 0px;"><span data-contrast="auto" xml:lang="PT-BR" lang="PT-BR" class="TextRun SCXW198931361 BCX0" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; font-variant-ligatures: none !important; font-size: 11pt; line-height: 18.3458px; font-family: Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif;"><span class="NormalTextRun SCXW198931361 BCX0" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent;"></span></span><span class="EOP SCXW198931361 BCX0" data-ccp-props="{&quot;201341983&quot;:0,&quot;335559740&quot;:259}" style="margin: 0px; padding: 0px; user-select: text; -webkit-user-drag: none; -webkit-tap-highlight-color: transparent; font-size: 11pt; line-height: 18.3458px; font-family: Calibri, Calibri_EmbeddedFont, Calibri_MSFontService, sans-serif;"> </span></p></div></div></td></tr></tbody></table>',
            customValues: {},
            snapshotBeforePaste: '<div><br></div><!--{"start":[0,0],"end":[0,0]}-->',
            htmlFirstLevelChildTags: ['TABLE'],
        };
        editor.paste(clipboard);
        const table = document.querySelector(`[${WORD_ONLINE_TABLE_STYLE}]`);
        const div = document.createElement('div');
        document.body.appendChild(div);
        div.innerHTML = expectedTable;
        expect(table).toEqual(div.firstChild as HTMLTableElement);
        document.body.removeChild(div);
    }

    TestHelper.itChromeOnly('should remove windowtext color', () => {
        runTest(expectedTable);
    });
});
