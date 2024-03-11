import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./DynamicMap"), {
  ssr: false,
});

// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;
//@ts-expect-error flemme d'ajouter les types
const Map = (props) => {
  const { width = props.width, height = props.height } = props;
  return (
    <div style={{ aspectRatio: width / height }}>
      <DynamicMap {...props} />
    </div>
  );
};

export default Map;
