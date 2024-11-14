import ContentLoader from "react-content-loader";

const ResourcesFormSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={340}
      height={120}
      viewBox="0 0 340 120"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="4" y="0" rx="3" ry="3" width="140" height="11" />
      <rect x="157" y="51" rx="3" ry="3" width="173" height="11" />
      <rect x="157" y="24" rx="3" ry="3" width="171" height="10" />
      <rect x="8" y="49" rx="3" ry="3" width="131" height="11" />
      <rect x="6" y="73" rx="3" ry="3" width="326" height="36" />
      <rect x="5" y="23" rx="3" ry="3" width="140" height="11" />
      <rect x="159" y="2" rx="3" ry="3" width="168" height="10" />
    </ContentLoader>
  );
};

export default ResourcesFormSkeleton;
