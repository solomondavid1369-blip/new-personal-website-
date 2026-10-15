import { publicFileExists } from "@/lib/public-file";
import Thumb from "./Thumb";

type Props = Omit<React.ComponentProps<typeof Thumb>, "hasImage">;

/** Server wrapper around Thumb that checks whether the image exists yet. */
export default function WorkThumb(props: Props) {
  return <Thumb {...props} hasImage={publicFileExists(props.src)} />;
}
