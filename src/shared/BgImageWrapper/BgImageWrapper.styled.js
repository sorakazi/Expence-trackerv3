import styled from "styled-components";
import { homeImages } from "images/home/home-images";

const { img1Desk, img2Desk, img1Mob, img2Mob, img1Tab, img2Tab } = homeImages;

const mediaQueries = {
  mobile:
    "@media (min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx)",
  tablet: "@media (min-width: 768px)",
  desktop: "@media (min-width: 1280px)",
};

export const StyledBgImageWrapper = styled.div`
  position: relative;
  width: 335px;
  height: 381px;
  margin-top: 40px;
  margin-bottom: 20px;
  border-radius: 20px;

  background-color: var(--gray-text-60);
  background-image: url(${img1Mob});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  ${mediaQueries.mobile} {
    background-image: url(${img2Mob});
  }

  ${mediaQueries.tablet} {
    width: 704px;
    height: 482px;
    margin-top: 36px;
    margin-bottom: 32px;
    background-image: url(${img1Tab});

    ${mediaQueries.mobile} {
      background-image: url(${img2Tab});
    }
  }

  ${mediaQueries.desktop} {
    width: 611px;
    height: 568px;
    margin: 0;
    background-image: url(${img1Desk});

    ${mediaQueries.mobile} {
      background-image: url(${img2Desk});
    }
  }
`;
