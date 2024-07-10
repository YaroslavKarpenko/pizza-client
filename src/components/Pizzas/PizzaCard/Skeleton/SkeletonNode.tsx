import React from 'react';

import { SxProps } from '@mui/system';
import { Skeleton } from '@mui/material';

type SkeletonNodeProps = {
  sx?: SxProps;
  width: string | number;
  height: string | number;
};

const SkeletonNode: React.FC<SkeletonNodeProps> = ({ sx, width, height }) => (
  <Skeleton animation="wave" variant="rounded" sx={sx} width={width} height={height} />
);

export default SkeletonNode;
