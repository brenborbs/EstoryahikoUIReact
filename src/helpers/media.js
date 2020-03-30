import css from "@emotion/css/macro";

const sizes = {
  small: 680,
  medium: 768,
  large: 928,
  extra: 1024
};
export default Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});
