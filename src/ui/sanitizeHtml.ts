import DOMPurify, { Config, DOMPurify as TDOMPurify } from 'dompurify';

/**
 * Based on SANITIZE_HTML_CONFIG in Kanbanchi app.
 * DOMPurify drops target by default - links with target="_blank" (messages.js "Learn more" etc.)
 * would open in the same tab and take the user away from Kanbanchi.
 *
 * FORBID_TAGS - not scripts, but still dangerous in tooltip / snackbar / modal content:
 * - style: css for the whole page (hide ui, leak data through url() selectors)
 * - form elements: modal content is inside <form>, button click / Enter in input submits it and reloads the app
 * - math: not needed, common base of mutation XSS
 * svg, img and style attribute are kept - app tooltips are built from icons, file icons and custom colors.
 */
export const SANITIZE_HTML_CONFIG: Config = {
    ADD_ATTR: ['target', 'title'],
    FORBID_TAGS: ['style', 'form', 'input', 'button', 'textarea', 'select', 'option', 'math'],
};

const SANITIZE_CACHE_MAX_SIZE = 1000;

/**
 * Content is sanitized on every render of a component (Tooltip builds it even when not shown),
 * the same strings repeat - cache them.
 */
const sanitizeCache = new Map<string, string>();

let purifier: TDOMPurify = null;

/**
 * Own instance, so the hook below does not leak into the global DOMPurify of the host app.
 * Created lazily - window is required.
 */
const getPurifier = (): TDOMPurify => {
    if (!purifier) {
        purifier = DOMPurify(window);
        purifier.addHook('afterSanitizeAttributes', (node) => {
            // any element with target: html <a>, <area>, svg <a> (its tagName is lowercase)
            if (node.hasAttribute('target')) {
                // reverse tabnabbing: opened page must not get window.opener
                node.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }
    return purifier;
};

/**
 * Removes scripts, event handlers, javascript: urls, <style> and form elements,
 * keeps safe markup (<b>, <br>, <a href target>...).
 * Use for every string passed to dangerouslySetInnerHTML.
 */
export const sanitizeHtml = (
    html: string
): string => {
    if (!html) return '';
    const source = String(html);
    const cached = sanitizeCache.get(source);
    if (cached !== undefined) return cached;

    const sanitized = getPurifier().sanitize(source, SANITIZE_HTML_CONFIG);
    if (sanitizeCache.size >= SANITIZE_CACHE_MAX_SIZE) {
        sanitizeCache.delete(sanitizeCache.keys().next().value);
    }
    sanitizeCache.set(source, sanitized);
    return sanitized;
};
