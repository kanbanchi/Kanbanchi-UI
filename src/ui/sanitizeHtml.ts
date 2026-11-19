import DOMPurify, { Config, DOMPurify as TDOMPurify } from 'dompurify';

/**
 * Same config as SANITIZE_HTML_CONFIG in Kanbanchi app.
 * DOMPurify drops target by default - links with target="_blank" (messages.js "Learn more" etc.)
 * would open in the same tab and take the user away from Kanbanchi.
 */
export const SANITIZE_HTML_CONFIG: Config = {
    ADD_ATTR: ['target', 'title'],
};

let purifier: TDOMPurify = null;

/**
 * Own instance, so the hook below does not leak into the global DOMPurify of the host app.
 * Created lazily - window is required.
 */
const getPurifier = (): TDOMPurify => {
    if (!purifier) {
        purifier = DOMPurify(window);
        purifier.addHook('afterSanitizeAttributes', (node) => {
            if (
                node.tagName === 'A' &&
                node.hasAttribute('target')
            ) {
                // reverse tabnabbing: opened page must not get window.opener
                node.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }
    return purifier;
};

/**
 * Removes scripts, event handlers and javascript: urls, keeps safe markup (<b>, <br>, <a href target>...).
 * Use for every string passed to dangerouslySetInnerHTML.
 */
export const sanitizeHtml = (
    html: string
): string => {
    if (!html) return '';
    return getPurifier().sanitize(String(html), SANITIZE_HTML_CONFIG);
};
