import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const TvIcon = (props: any) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <Path
      fillRule="evenodd"
      d="M30 28a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v16ZM28 8h-9.254l8.772-6.035c.463-.319.595-.977.295-1.469-.299-.492-.918-.633-1.382-.314 0 0-9.61 6.635-10.422 7.125L5.569.182C5.106-.137 4.486.004 4.187.496c-.3.492-.168 1.15.295 1.469L13.254 8H4a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V12a4 4 0 0 0-4-4Zm-1 15h-4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2Zm-9 2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V15a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10Zm0-13H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V14a2 2 0 0 0-2-2Zm9 14h-4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2Zm-3-12h2v2h-2v-2Zm1-2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
    />
  </Svg>
);
export default TvIcon;
