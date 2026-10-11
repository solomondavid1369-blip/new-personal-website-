export default async function Year() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}
