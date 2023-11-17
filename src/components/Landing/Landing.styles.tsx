import styled from "styled-components";

import { LandingStyledProps as Props } from "./Landing.types";

const LandingStyled = styled.div<Props>`
  min-width: calc(100vw - (100vw - 100%) - env(safe-area-inset-left) - env(safe-area-inset-right));
  max-width:  calc(100vw - (100vw - 100%) - env(safe-area-inset-left) - env(safe-area-inset-right));
  min-height: calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom));
  background-color: white;
  display: grid;
  /* grid-template-columns: minmax(1.6rem, 1fr) [content-start] minmax(0, 120rem) [content-end] minmax(1.6rem, 1fr); */
  grid-template-rows: max-content 1fr max-content;

  .Landing {
    &__header {
      grid-column: 1 / -1;
    }

    &__main {
      grid-column: 1 / -1;
    }

    &__footer {
      grid-column: 1 / -1;
      padding-top: 3.2rem;
    }
  }
`;

export default LandingStyled;
