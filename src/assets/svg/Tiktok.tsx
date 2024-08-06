import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const TiktokIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 7.504C18.533 7.57 15.52 6.76 15.2 3h-2.8v10.967c0 3.133-2.467 4.474-4.111 3.284-2.087-1.512-.689-4.655 1.911-4.264V9.658c-2 0-6.2.784-6.2 5.68 0 6.266 6.815 6.07 8.4 5.244 2.58-1.344 3.2-2.8 3.2-6.028V9.071c.667.326 2.48 1.018 4.4 1.175"
    />
  </Svg>
);
export default TiktokIcon;
