import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
const SkeletonLoading = () => {
  return (
    <Grid item xs={12} md={6} mb={6}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} height={120}></Skeleton>
      ))}
    </Grid>
  );
};

export default SkeletonLoading;
