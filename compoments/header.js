import React from 'react';

export default function Header() {
  return (
    <>
      <header
        className="nsdc-header govuk-header"
        role="banner"
        data-module="govuk-header"
      >
        <div className="govuk-header__container govuk-width-container">
          <div className="govuk-header__logo">
            <a
              href="https://www.newark-sherwooddc.gov.uk/"
              className="govuk-header__link govuk-header__link--homepage header-link govuk-link--no-visited-state"
            >
              <span className="govuk-header__logotype">
                <svg
                  width="168"
                  height="60"
                  viewBox="0 0 168 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.93054 14.8321C7.93054 14.8321 7.39966 14.0586 8.40424 12.7652C9.40866 11.4834 11.9367 8.89697 13.357 7.99659C14.7885 7.10728 14.9385 7.10728 14.9385 7.10728C14.9385 7.10728 15.839 6.99178 15.8159 7.73056C15.7812 8.46983 16.2546 8.15819 16.393 8.10052C16.5201 8.05425 17.178 8.31979 16.8086 8.9201C16.8086 8.9201 16.6009 9.57807 17.2357 9.45117L17.7206 9.02403C17.7206 9.02403 18.1593 8.643 18.4594 8.94323C18.7715 9.2433 18.8177 9.41647 18.5636 9.69358C18.3093 9.98257 18.0554 10.3866 18.0554 10.3866C18.0554 10.3866 17.8246 10.6521 18.0901 10.8253C18.367 10.9985 18.2632 11.01 18.5522 10.7907C18.8291 10.5713 19.2217 10.0518 20.0991 9.42804C20.0991 9.42804 20.5954 9.1625 20.2952 8.9201C19.9952 8.68926 20.0413 8.86243 19.8104 8.9201C19.5796 8.98934 18.7715 8.57376 19.2333 7.86952C19.7065 7.16495 20.2491 6.78391 20.2491 6.78391C20.2491 6.78391 20.7223 6.58778 20.2838 6.43758C20.2838 6.43758 20.0991 6.06827 20.5031 5.49061C20.9071 4.92483 22.8349 3.49305 23.1697 3.38912C23.5044 3.29675 23.7589 2.86961 24.2205 3.31989C24.6708 3.78156 24.4515 3.72389 24.4053 3.90895C24.4053 3.90895 24.186 4.23216 24.5208 4.45159C24.8555 4.67086 24.9247 4.68243 25.1903 4.56709C25.4558 4.45159 26.8064 3.30832 26.8064 3.30832C26.8064 3.30832 27.8337 2.54641 28.3187 3.67763C28.3187 3.67763 28.5034 3.90895 28.3532 4.18606C28.3532 4.18606 28.4918 4.71713 29.1387 4.37079C29.7966 4.01289 29.9006 3.74702 29.9006 3.74702C29.9006 3.74702 30.3854 3.26205 30.9856 3.74702C31.5975 4.23216 31.1472 4.49769 30.9856 4.74026C30.8356 4.9711 30.6048 5.67534 31.332 5.58297C31.332 5.58297 31.8977 5.14427 32.1862 5.10957C32.4748 5.07503 33.029 5.65221 33.2251 5.8951C33.433 6.14907 34.2991 6.85331 33.4677 7.66133C32.6249 8.46983 32.3017 9.0817 32.6596 9.34724C33.0059 9.61278 33.179 9.67044 34.1141 8.8393C35.061 8.01956 35.3496 8.30823 35.846 8.90853C36.3541 9.50884 36.6541 10.0865 36.3886 10.4675C36.1231 10.86 35.292 11.807 35.8807 11.6916C35.8807 11.6916 37.1044 11.7377 36.3425 12.9499C36.3425 12.9499 35.5459 13.6315 35.9268 13.8508C36.3078 14.0586 36.8734 13.7468 36.8734 13.7468C36.8734 13.7468 37.5546 13.5733 37.9817 14.6705C37.9817 14.6705 38.1202 15.2016 38.051 16.0793C38.051 16.0793 38.1778 16.1947 38.4896 16.1025C38.8013 16.0215 39.2399 15.5364 39.3784 15.4209C39.5289 15.2938 40.0139 14.7743 40.3831 14.7974C40.7526 14.8321 41.122 14.7859 41.2489 15.4209C41.376 16.0446 41.4221 15.9754 41.526 16.1833C41.63 16.391 42.2418 16.7257 41.6645 17.615C41.6645 17.615 41.1913 18.0653 40.9258 18.504C40.6718 18.9427 41.4799 19.0582 41.4221 19.5665C41.4221 19.5665 41.4452 19.8436 41.0989 20.1784C40.7526 20.5131 41.0065 21.125 41.0065 21.125C41.0065 21.125 41.2374 21.3558 40.591 21.9105C39.956 22.4646 39.2515 23.2265 39.2515 23.2265C39.2515 23.2265 38.7897 23.6194 39.1823 24.0581C39.5866 24.5084 40.1061 23.9312 40.21 23.8389C40.3255 23.7465 41.4221 22.7532 41.4221 22.7532C41.4221 22.7532 42.0339 22.1645 42.5997 22.4414C43.1768 22.7185 43.1768 23.2149 43.3153 23.7695C43.3153 23.7695 43.4884 24.0928 43.8926 23.7118C43.8926 23.7118 45.2319 22.9148 45.1282 24.035C45.0358 25.1664 45.2319 24.8085 45.2898 24.8663C45.2898 24.8663 45.7745 25.0971 45.4745 25.998C45.4745 25.998 45.3243 26.3096 44.158 27.3723C44.158 27.3723 43.6963 27.73 43.2808 28.2727C42.865 28.8269 43.4769 28.8614 43.4769 28.8614C43.4769 28.8614 43.7887 28.769 43.9964 28.6306C44.1926 28.5035 44.666 28.0418 45.0358 28.2034C45.4051 28.3766 45.3129 28.769 45.2319 28.8614C45.1397 28.9538 45.1511 29.1154 45.2319 29.2077C45.3243 29.289 45.2551 29.6583 45.105 29.8778C44.9666 30.097 44.6198 30.5242 44.6198 30.5242C44.6198 30.5242 44.2966 30.8937 44.7587 30.9629C45.209 31.0323 45.4629 31.0668 45.4629 31.4021C45.4629 31.7369 45.509 31.7022 44.978 32.6488C44.4466 33.5959 42.7958 34.6349 42.4034 34.8889C42.0108 35.1313 41.78 35.1895 41.5953 35.0043C41.4105 34.8081 41.5145 34.3463 40.845 34.6002C40.1754 34.8542 39.7713 35.5474 39.7713 35.5474C39.7713 35.5474 39.656 35.6859 39.8637 35.9283C40.0715 36.1591 40.1523 36.0438 40.2908 35.9514C40.4294 35.8706 40.5794 35.732 40.9373 35.7898C41.2952 35.8475 41.3413 36.2862 41.3413 36.2862C41.3413 36.2862 41.4568 36.7825 41.7223 36.5517C41.9878 36.3323 42.4379 36.0669 42.4379 36.0669C42.4379 36.0669 42.8997 35.9398 43.0613 36.1938C43.2345 36.4593 43.3615 36.8865 43.7308 36.7249C44.1118 36.5517 44.4813 36.3901 44.689 36.517C44.8972 36.6441 45.3474 36.6786 44.9203 37.4179C44.9203 37.4179 44.5621 37.7181 44.3427 37.9144C44.135 38.099 43.8463 38.6879 44.3889 38.5955C44.3889 38.5955 44.6545 38.5261 45.0127 38.3645C45.3821 38.1913 45.4629 38.3184 45.6014 38.4339C45.74 38.5377 45.9246 38.988 45.5437 39.4501C45.1858 39.8888 45.1743 39.912 44.7703 40.2699C44.3889 40.6162 44.4929 40.5815 44.6774 40.7778C44.6774 40.7778 45.2435 41.3555 44.2389 42.1058C43.2345 42.8677 43.8926 42.7407 43.9618 42.8909C44.0195 43.0528 44.3889 43.3183 43.6963 43.9649C42.9921 44.6113 42.7381 44.7499 42.7381 44.7499C42.7381 44.7499 42.2995 44.9581 41.9763 44.8768C41.6531 44.796 41.6645 44.6576 41.8031 44.4613C41.9416 44.2765 42.4034 43.6994 41.5492 43.8378C41.5492 43.8378 41.1105 43.9649 40.9373 44.4613C40.7757 44.9466 41.2836 44.8423 41.1105 45.189C40.9258 45.5353 40.7987 45.8124 39.9215 46.4935C39.9215 46.4935 39.806 46.7591 39.2399 46.8283C38.6858 46.8864 38.9399 47.1749 38.4665 47.0941C38.4665 47.0941 37.9931 46.8283 38.0394 46.5512C38.0855 46.2741 37.9931 46.378 38.2933 45.9624C38.5936 45.5584 38.5357 44.9697 38.0047 45.316C37.4622 45.6508 37.4968 45.9277 36.4002 46.1472C36.4002 46.1472 35.7422 46.3896 35.7652 45.0389V38.2721L33.9986 30.9052L32.3248 38.2721V40.6623H29.1732V38.226L27.3721 30.9284L25.675 38.226V50.7312C25.675 50.7312 25.3634 52.2324 23.8973 52.7522C23.8973 52.7522 23.1813 53.0062 23.3081 52.163C23.3081 52.163 23.1236 51.6205 22.7887 52.0476C22.4424 52.4748 21.946 52.7056 21.6113 52.4632C21.2649 52.2208 21.2534 51.8166 21.392 51.6205C21.5189 51.4126 21.8652 51.0778 21.8652 51.0778C21.8652 51.0778 22.1423 50.8354 21.9576 50.6272C21.7844 50.4194 21.5189 50.581 21.5189 50.581L21.011 50.9278C21.011 50.9278 20.6762 51.3781 20.4799 51.1586C20.2838 50.9509 20.076 50.9509 20.1106 50.3962V38.5839H17.9515V40.6854H15.9659V38.6071H13.9804V40.6623H12.029V38.6185H9.91657V45.2351C9.91657 45.2351 9.45476 46.3435 7.78051 47.0133C7.78051 47.0133 7.36496 47.1173 7.07631 46.6436C6.79938 46.1817 6.08361 47.0133 6.08361 47.0133C6.08361 47.0133 5.09076 48.1679 4.60598 47.7292C4.10963 47.2904 3.39386 46.8744 3.3015 46.7591C3.2207 46.6551 2.73592 46.4588 3.24384 45.8008C3.24384 45.8008 4.0865 45.2929 3.46309 44.9115C3.46309 44.9115 2.93205 44.9115 2.87439 44.4036C2.82829 43.8957 2.86282 43.7802 2.31989 44.1034C1.78884 44.4381 1.5349 43.9533 1.5349 43.9533C1.5349 43.9533 1.14242 43.4569 1.51182 42.7754C1.51182 42.7754 1.65035 42.6137 1.90434 42.2443C2.16986 41.875 2.0775 42.025 1.82354 41.6787C1.56953 41.3323 1.17705 40.9394 1.78884 40.2005C2.40068 39.4617 3.20914 38.6301 3.20914 38.6301C3.20914 38.6301 4.25966 37.7758 3.69408 37.5218C3.69408 37.5218 3.41699 37.187 2.98988 37.7642C2.98988 37.7642 2.74749 38.076 2.16986 37.845C1.59263 37.6026 2.1236 36.8749 2.1236 36.8749C2.1236 36.8749 2.43538 36.6094 2.25065 36.3093C2.06593 35.9975 1.68498 36.4593 1.44256 36.7133C1.20013 36.9788 0.715288 37.3025 0.26509 36.898C-0.196673 36.5054 0.322805 35.7551 0.519046 35.5474C0.703755 35.3395 1.37329 34.6118 1.37329 34.6118L2.05436 33.896C2.05436 33.896 2.50461 33.2726 3.09381 33.4573C3.31307 33.5267 3.62469 34.0115 3.62469 34.0115C3.62469 34.0115 3.62469 34.1384 3.89021 33.8499C4.1673 33.5497 4.69834 32.9951 5.21782 32.6604C5.74886 32.314 6.15284 32.2909 6.2799 32.5103C6.41837 32.7296 6.75312 32.9259 6.92628 32.7296C7.09944 32.5335 7.36496 32.1293 7.78051 31.91C8.20811 31.6906 8.40424 31.4021 8.21968 31.2981C8.03495 31.2055 7.66502 30.7897 7.53812 30.3626C7.42262 29.947 7.1457 30.3049 6.97254 30.3741C6.79938 30.4434 6.45306 30.582 5.81809 30.1894C5.18312 29.7854 5.5757 29.3814 5.19469 29.6815C4.81383 29.9817 4.64067 30.1433 4.06337 30.0278C3.48623 29.9125 3.28994 29.0577 3.69408 28.6998C4.09807 28.3303 4.57128 27.5107 4.57128 27.5107C4.57128 27.5107 5.05622 27.0486 4.75601 26.7715C4.44438 26.5059 4.01727 26.9562 3.71705 27.2333C3.42856 27.5107 2.87439 27.8802 2.51618 27.5569C2.15829 27.2449 1.78884 26.8754 2.13516 26.2867C2.48148 25.6979 3.05911 25.0279 3.20914 24.8893C3.35917 24.7392 4.73287 23.1341 4.73287 23.1341C4.73287 23.1341 5.13702 22.8456 4.76757 22.5338C4.39812 22.2222 4.7907 21.5295 4.9176 21.4252C5.04466 21.3097 5.74886 20.4092 6.21051 19.9821C6.67232 19.5549 7.05334 19.2891 7.05334 19.2891C7.05334 19.2891 7.60735 18.9196 7.896 19.3814C8.18498 19.8436 7.90757 20.1668 7.90757 20.1668C7.90757 20.1668 7.64205 20.6171 7.90757 20.8018C8.18498 20.9981 8.34658 20.7787 8.6582 20.4555C8.95842 20.1207 10.7016 18.1116 11.3942 17.6036C12.0868 17.0952 12.1561 16.6796 11.8329 16.4833C11.4981 16.287 10.8516 16.7836 10.8516 16.7836L9.9858 17.5574C9.9858 17.5574 9.50102 18.0537 9.09688 17.6613C8.69289 17.2799 8.83136 16.7489 8.43894 16.9567C8.03495 17.1644 7.90757 17.6036 7.44576 17.5223C6.98394 17.43 6.54526 16.9681 6.72999 16.5641C6.91471 16.1601 7.42262 15.1669 7.93054 14.8321V14.8321Z"
                    fill="#609836"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M6.86853 57.694C6.86853 57.694 8.09254 57.1398 10.2512 56.4121C10.2512 56.4121 10.586 56.3313 10.6207 56.0889C10.6552 55.8465 10.5513 55.881 11.5442 55.5117C12.5484 55.1307 13.634 54.6685 15.2848 54.4953C16.924 54.3222 16.924 54.7496 16.7508 55.2807C16.5892 55.8002 17.051 55.5925 17.2819 55.477C17.5127 55.3731 20.9648 54.3337 21.9806 54.2759C21.9806 54.2759 22.6386 54.1259 22.9503 54.3798C23.2735 54.6222 22.8117 55.096 23.3081 54.8536C23.8165 54.6108 24.9362 54.6569 24.9939 54.9228C25.0517 55.1768 24.9709 55.5347 26.0444 55.1883C27.1065 54.842 32.0245 53.9527 33.5021 54.2645C34.9917 54.5646 32.8903 56.1234 34.784 55.2807C34.784 55.2807 39.1014 54.6222 40.9025 55.1422C42.7149 55.6502 41.676 57.2782 41.3875 57.4745C41.1104 57.6708 40.1754 58.1788 39.0436 58.4674C37.9122 58.7564 37.4737 58.2712 37.7738 57.8556C38.074 57.4514 37.82 57.4284 36.6425 57.5785C35.4188 57.7401 33.9293 57.9133 30.9394 58.6872C30.9394 58.6872 29.8658 59.045 29.2426 59.1836C28.6187 59.3221 28.4225 58.6872 28.5957 58.4559C28.7689 58.225 28.3417 58.225 27.7529 58.3981C27.1642 58.5713 26.7139 58.6294 26.7602 57.7055C26.7602 57.7055 26.9679 57.1974 25.8828 57.59C25.8828 57.59 22.7078 58.3173 21.7382 58.6294C20.7569 58.9527 20.4453 58.6175 20.3759 58.1557C20.3759 58.1557 20.3183 57.9364 20.7108 57.694C21.1033 57.4514 20.7569 57.0821 20.2375 57.2898C19.718 57.4977 18.1822 57.7748 17.2126 58.2712C17.2126 58.2712 15.7927 59.3221 15.2155 58.502C15.2155 58.502 15.1116 58.0287 13.784 58.7564C13.784 58.7564 12.9755 58.9873 12.9063 58.225C12.9063 58.225 13.0449 57.717 11.8328 58.2134L8.71594 59.4145C8.71594 59.4145 7.97704 59.7377 7.82669 59.2297C7.6765 58.7333 6.53378 59.3683 6.53378 59.3683C6.53378 59.3683 5.71408 59.9455 5.24087 59.299C4.75592 58.6294 6.70694 57.7863 6.86853 57.694V57.694Z"
                    fill="#79A9DD"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M59.905 22.0488H61.4985V6.32206H59.8011V18.827L52.2972 6.32206H50.7272V22.0488H52.4357V9.47413L59.905 22.0488Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M64.6729 22.0488H73.828V20.513H66.3934V14.6125H72.5236V13.1576H66.3934V7.86934H73.6549V6.32206H64.6729V22.0488V22.0488Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M79.2771 22.0488H80.4663L83.8028 9.80922L87.197 22.0488H88.3862L92.6923 6.32206H90.7757L88.767 14.2777C88.4554 15.5362 88.0975 17.2105 87.8204 18.4693C87.5319 17.2105 87.197 15.5362 86.8623 14.2777L84.8417 6.32206H82.8562L80.8472 14.2777C80.5355 15.5362 80.1776 17.2105 79.9006 18.4693C79.6119 17.2105 79.2311 15.5362 78.9308 14.2777L76.9223 6.32206H74.9363L79.2771 22.0488V22.0488Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M99.4229 9.24313L102.216 16.9103H96.6866L99.4229 9.24313V9.24313ZM104.099 22.0488H105.795L100.035 6.32206H98.7995L93.0387 22.0488H94.7472L96.1324 18.3654H102.725L104.099 22.0488V22.0488Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M109.109 7.55721H111.949C114.708 7.55721 115.839 8.45809 115.839 10.525C115.839 12.5342 113.935 13.6429 111.822 13.6429H109.109V7.55721V7.55721ZM112.387 14.9012L115.701 22.0488H117.617L114.085 14.6588C116.14 14.1046 117.49 12.5342 117.49 10.5943C117.49 7.44188 115.17 6.32206 112.595 6.32206H107.4V22.0488H109.109V14.9012H112.387Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M128.827 22.0488H130.698L124.833 13.0884L130.305 6.32206H128.388L121.566 14.7857V6.32206H119.869V22.0488H121.566V17.1066L123.794 14.3585L128.827 22.0488V22.0488Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M146.456 19.2884C145.521 20.2816 144.02 20.7896 142.635 20.7896C140.788 20.7896 139.24 19.739 139.24 17.6375C139.24 16.1132 140.453 15.0392 141.884 14.312L146.456 19.2884V19.2884ZM145.048 13.5958H147.818C147.934 14.2427 147.98 14.8199 147.98 15.3278C147.98 16.2287 147.737 17.3948 147.287 18.1455L142.577 12.9608C141.711 12.0373 140.984 10.9978 140.984 9.78562C140.984 8.28445 141.93 7.53378 143.235 7.53378C144.539 7.53378 145.417 8.19208 145.417 9.64683C145.417 10.7785 144.909 11.9218 144.089 12.499L145.048 13.5958ZM145.81 12.499C146.237 11.7949 146.941 10.8478 146.941 9.40426C146.941 7.24511 145.267 6.18296 143.327 6.18296C141.18 6.18296 139.414 7.57988 139.414 9.78562C139.414 11.3326 140.084 12.2797 141.03 13.3533C139.102 14.2196 137.543 15.6284 137.543 17.7876C137.543 20.7665 140.118 22.21 142.589 22.21C144.228 22.21 146.144 21.702 147.426 20.374L148.973 22.0021H150.912L148.28 19.1613C148.973 17.8799 149.319 16.6674 149.319 15.3394C149.319 14.7507 149.296 14.1733 149.238 13.5958H151.42L151.64 12.499H145.81V12.499Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M55.3106 25.9408C52.1932 25.9408 50.7503 27.2799 50.7503 29.3125C50.7503 31.4834 51.6045 32.6377 54.3288 33.4232L56.5919 34.0812C58.0002 34.4852 58.612 35.3861 58.612 36.7253C58.612 38.3534 57.3999 39.947 55.033 39.947C53.4977 39.947 52.2164 39.5661 50.6464 38.7806L50.0229 40.2703C51.5584 40.9514 53.0937 41.3789 55.0793 41.3789C58.4388 41.3789 60.3436 39.1851 60.3436 36.6214C60.3436 34.4044 59.1893 33.0187 56.7651 32.3376L54.5598 31.7142C52.9435 31.2755 52.4587 30.4324 52.4587 29.266C52.4587 27.8113 53.9479 27.3496 55.3335 27.3496C56.3494 27.3496 57.6309 27.7305 59.2585 28.3078L59.6741 26.922C57.9772 26.264 56.3148 25.9408 55.3106 25.9408V25.9408Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M71.0691 41.251H72.7084V26.0436H71.0691V32.6945H64.4998V26.0436H62.8376V41.251H64.4998V34.0571H71.0691V41.251V41.251Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M75.7791 41.251H84.6224V39.7498H77.4417V34.0571H83.364V32.6598H77.4417V27.5333H84.4492V26.0436H75.7791V41.251Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M88.5361 27.2443H91.2951C93.9507 27.2443 95.0473 28.1221 95.0473 30.1081C95.0473 32.0595 93.2118 33.1216 91.1681 33.1216H88.5361V27.2443ZM91.7222 34.3342L94.9202 41.251H96.7673L93.3618 34.1033C95.3358 33.5722 96.6403 32.0595 96.6403 30.1659C96.6403 27.1288 94.4007 26.0436 91.907 26.0436H86.8969V41.251H88.5361V34.3342H91.7222Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M101.928 41.251H103.083L106.303 29.4154L109.582 41.251H110.737L114.893 26.0436H113.034L111.094 33.7339C110.794 34.946 110.459 36.5743 110.183 37.7868C109.894 36.5743 109.582 34.946 109.259 33.7339L107.296 26.0436H105.38L103.44 33.7339C103.14 34.946 102.806 36.5743 102.528 37.7868C102.251 36.5743 101.882 34.946 101.593 33.7339L99.6421 26.0436H97.7258L101.928 41.251Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M118.125 33.6541C118.125 30.3978 118.148 29.4164 118.807 28.5155C119.326 27.7999 120.411 27.2799 121.623 27.2799C122.835 27.2799 123.921 27.7999 124.44 28.5155C125.098 29.4164 125.121 30.3978 125.121 33.6541C125.121 36.9216 125.098 37.9033 124.44 38.7921C123.921 39.5198 122.835 40.0278 121.623 40.0278C120.411 40.0278 119.326 39.5198 118.807 38.7921C118.148 37.9033 118.125 36.9216 118.125 33.6541V33.6541ZM116.44 33.6541C116.44 37.4991 116.74 38.365 117.167 39.1851C117.825 40.478 119.407 41.3789 121.623 41.3789C123.84 41.3789 125.421 40.478 126.08 39.1851C126.507 38.365 126.807 37.4991 126.807 33.6541C126.807 29.8206 126.507 28.9427 126.08 28.1347C125.421 26.8412 123.84 25.9408 121.623 25.9408C119.407 25.9408 117.825 26.8412 117.167 28.1347C116.74 28.9427 116.44 29.8206 116.44 33.6541V33.6541Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M130.963 33.6541C130.963 30.3978 130.986 29.4164 131.644 28.5155C132.152 27.7999 133.237 27.2799 134.45 27.2799C135.673 27.2799 136.759 27.7999 137.266 28.5155C137.924 29.4164 137.959 30.3978 137.959 33.6541C137.959 36.9216 137.924 37.9033 137.266 38.7921C136.759 39.5198 135.673 40.0278 134.45 40.0278C133.237 40.0278 132.152 39.5198 131.644 38.7921C130.986 37.9033 130.963 36.9216 130.963 33.6541V33.6541ZM129.278 33.6541C129.278 37.4991 129.578 38.365 130.005 39.1851C130.663 40.478 132.233 41.3789 134.45 41.3789C136.678 41.3789 138.248 40.478 138.917 39.1851C139.333 38.365 139.633 37.4991 139.633 33.6541C139.633 29.8206 139.333 28.9427 138.917 28.1347C138.248 26.8412 136.678 25.9408 134.45 25.9408C132.233 25.9408 130.663 26.8412 130.005 28.1347C129.578 28.9427 129.278 29.8206 129.278 33.6541V33.6541Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M147.206 27.2557C148.418 27.2557 149.481 27.7295 150 28.4568C150.658 29.3577 150.682 30.3736 150.682 33.653C150.682 36.9206 150.658 37.9368 150 38.8374C149.481 39.5651 148.418 39.9691 147.206 39.9691H144.02V27.2443L147.206 27.2557V27.2557ZM142.404 26.0436V41.251H147.287C149.457 41.251 150.982 40.3501 151.64 39.0687C152.067 38.2602 152.367 37.4865 152.367 33.653C152.367 29.7964 152.067 28.8263 151.64 28.0066C150.982 26.7133 149.423 26.0206 147.206 26.0206L142.404 26.0436V26.0436Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M53.6824 55.5928C55.0793 55.5928 56.0609 55.0617 56.5919 54.3109C56.9267 53.8261 57.1922 53.2258 57.5962 51.1127C57.827 49.8655 57.9078 49.2536 57.9078 48.7915C57.9078 47.4638 56.9959 46.6206 55.1138 46.6206H52.274L50.5887 55.5928H53.6824V55.5928ZM53.5785 47.6138H55.033C55.9454 47.6138 56.4764 47.9717 56.4764 48.7452C56.4764 49.1728 56.3725 49.8077 56.1185 51.1243C55.8069 52.7289 55.5645 53.549 55.1138 54.0338C54.779 54.3917 54.2596 54.5995 53.6593 54.5995H52.2624L53.5785 47.6138V47.6138Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M58.6236 55.5928H60.1012L61.7871 46.6553H60.3091L58.6236 55.5928V55.5928Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M66.4627 46.563C64.3267 46.563 63.2993 47.4754 63.2993 48.8145C63.2993 49.727 63.6571 50.2696 64.9501 50.9281C65.2848 51.1012 65.7466 51.3321 66.1164 51.5052C66.809 51.84 67.0285 52.2095 67.0285 52.729C67.0285 53.6299 66.1164 54.4841 64.8346 54.4841C64.1074 54.4841 63.2069 54.1839 62.3527 53.7568L61.8795 54.9002C62.7914 55.3389 63.8766 55.6621 64.8461 55.6621C67.1438 55.6621 68.5867 54.1725 68.5983 52.3942C68.5983 51.4821 68.0559 50.8241 66.9245 50.3043C66.5898 50.1541 66.024 49.9001 65.6658 49.7154C65.1809 49.4961 64.8346 49.2653 64.8346 48.78C64.8346 47.8333 65.8277 47.7063 66.4511 47.7063C67.1438 47.7063 67.9288 48.0065 68.6214 48.2836L69.1178 47.1638C68.0327 46.7824 67.2477 46.563 66.4627 46.563V46.563Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M73.7012 47.764H75.8829L76.1023 46.6553H70.2607L70.0528 47.764H72.212L70.7454 55.5928H72.2236L73.7012 47.764V47.764Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M78.6191 47.6477H80.1429C81.0087 47.6477 81.4358 48.121 81.4358 48.8022C81.4358 48.9757 81.4128 49.1258 81.3666 49.2874C81.1357 50.084 80.3854 50.6843 79.1386 50.6843H78.042L78.6191 47.6477ZM80.6624 51.5391C81.6902 51.1235 82.4982 50.3956 82.7292 49.4144C82.7984 49.1605 82.8331 48.8834 82.8331 48.6291C82.8331 47.313 81.7248 46.6545 80.4547 46.6545H77.3262L75.6288 55.592H77.1299L77.8457 51.7699H79.1502C79.3233 52.4857 79.5773 53.1671 79.866 53.7906C80.42 54.9917 81.3434 55.6958 82.2905 55.7305L83.1216 54.7723C82.3713 54.5872 81.7942 54.2062 81.3434 53.3287C81.0779 52.8092 80.8239 52.2202 80.6624 51.5391V51.5391Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M83.8605 55.5928H85.3496L87.0354 46.6553H85.5459L83.8605 55.5928V55.5928Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M91.8377 46.5746C90.2909 46.5746 89.5635 47.0252 89.0325 47.7871C88.6978 48.272 88.4207 48.9766 88.0167 51.1128C87.7859 52.3364 87.728 53.0296 87.728 53.4914C87.728 54.75 88.4554 55.6621 90.2099 55.6621C90.8449 55.6621 92.0223 55.4774 93.1772 55.004L92.8309 53.9993C91.7454 54.3571 91.0181 54.4957 90.4409 54.4957C89.3673 54.4957 89.1941 54.0107 89.1941 53.2373C89.1941 52.7987 89.2865 52.2787 89.5059 51.1128C89.8522 49.3114 89.9446 48.7916 90.3139 48.3413C90.6256 47.9487 91.1104 47.6947 91.7454 47.6947C92.3344 47.6947 93.2349 47.9602 94.0891 48.2605L94.5047 47.233C93.7544 46.8517 92.3691 46.5746 91.8377 46.5746Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M98.9726 47.764H101.166L101.374 46.6553H95.5436L95.3243 47.764H97.4949L96.017 55.5928H97.5065L98.9726 47.764V47.764Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M108.116 46.5746C106.569 46.5746 105.842 47.0252 105.311 47.7871C104.976 48.272 104.699 48.9766 104.295 51.1128C104.064 52.3364 104.006 53.0296 104.006 53.4914C104.006 54.75 104.733 55.6621 106.488 55.6621C107.123 55.6621 108.301 55.4774 109.455 55.004L109.109 53.9993C108.024 54.3571 107.296 54.4957 106.719 54.4957C105.645 54.4957 105.472 54.0107 105.472 53.2373C105.472 52.7987 105.565 52.2787 105.784 51.1128C106.13 49.3114 106.234 48.7916 106.592 48.3413C106.904 47.9487 107.389 47.6947 108.024 47.6947C108.613 47.6947 109.513 47.9602 110.367 48.2605L110.794 47.233C110.032 46.8517 108.659 46.5746 108.116 46.5746V46.5746Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M116.14 51.1128C115.805 52.8332 115.655 53.4798 115.331 53.907C115.031 54.2994 114.558 54.5534 113.842 54.5534C112.803 54.5534 112.549 54.0223 112.549 53.2259C112.549 52.6827 112.653 52.221 112.849 51.1128C113.184 49.3114 113.311 48.7684 113.658 48.3066C113.969 47.9257 114.512 47.6833 115.158 47.6833C116.14 47.6833 116.486 48.0757 116.486 48.9189C116.486 49.3114 116.324 50.108 116.14 51.1128V51.1128ZM111.348 51.1128C111.106 52.3711 111.06 53.0296 111.06 53.4914C111.06 54.75 111.868 55.6621 113.635 55.6621C115.228 55.6621 116.07 55.1657 116.624 54.3918C116.959 53.9299 117.236 53.2259 117.64 51.1128C117.883 49.854 117.952 49.1498 117.952 48.6876C117.952 47.4292 117.121 46.5746 115.366 46.5746C113.785 46.5746 112.907 47.0367 112.376 47.7986C112.03 48.2836 111.741 48.9535 111.348 51.1128V51.1128Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M121.704 55.6621C123.239 55.6621 124.106 55.1771 124.706 54.3457C125.017 53.907 125.271 53.2951 125.456 52.3827L126.553 46.6554H125.075L124.163 51.436C124.025 52.1864 123.852 53.168 123.528 53.6646C123.228 54.1147 122.789 54.5534 121.889 54.5534C120.85 54.5534 120.584 54.0107 120.584 53.1912C120.584 52.8909 120.677 52.3595 120.827 51.5284L121.739 46.6554H120.273C119.938 48.3644 119.684 49.7617 119.453 50.9626C119.176 52.4519 119.13 52.8909 119.13 53.2259C119.13 54.7034 119.926 55.6621 121.704 55.6621V55.6621Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M129.589 49.3921L132.06 55.5928H133.33L135.027 46.6553H133.595L132.395 52.9948L129.959 46.6553H128.7L127.003 55.5928H128.4L129.589 49.3921V49.3921Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M139.83 46.5746C138.282 46.5746 137.555 47.0252 137.024 47.7871C136.689 48.272 136.412 48.9766 136.008 51.1128C135.777 52.3364 135.72 53.0296 135.72 53.4914C135.72 54.75 136.447 55.6621 138.213 55.6621C138.836 55.6621 140.014 55.4774 141.18 55.004L140.822 53.9993C139.737 54.3571 139.01 54.4957 138.432 54.4957C137.37 54.4957 137.197 54.0107 137.197 53.2373C137.197 52.7987 137.278 52.2787 137.509 51.1128C137.844 49.3114 137.947 48.7916 138.305 48.3413C138.617 47.9487 139.102 47.6947 139.737 47.6947C140.337 47.6947 141.226 47.9602 142.081 48.2605L142.508 47.233C141.757 46.8517 140.372 46.5746 139.83 46.5746Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M142.577 55.5928H144.055L145.74 46.6553H144.251L142.577 55.5928V55.5928Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M146.248 55.5928H151.651L151.871 54.3917H147.957L149.423 46.6553H147.945L146.248 55.5928V55.5928Z"
                    fill="#1B191A"
                    stroke="#FFFFFE"
                    strokeWidth="0.00228062"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </a>
          </div>
        </div>
        <div className="border-banner"></div>
      </header>
    </>
  );
}
