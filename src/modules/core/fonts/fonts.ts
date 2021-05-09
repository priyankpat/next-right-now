export type AllowedFont = 'Manrope' ;

/**
 * XXX WIP not used
 *
 * @param font
 *
 * @see https://developers.google.com/fonts/docs/css2#axis_ranges
 */
export const injectFont = (font: AllowedFont): string => {
  switch (font) {
    // https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=optional
    case 'Manrope':
      return `
      @font-face {
        font-family: 'Manrope';
        font-style: normal;
        font-weight: 200 800;
        font-display: optional;
        src: url(Manrope-variable-latin.woff) format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      `;
  }
};
