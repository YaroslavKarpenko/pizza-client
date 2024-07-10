import React from 'react';
import SkeletonNode from './SkeletonNode';

const PizzaCardSkeleton: React.FC = () => (
  <div className="mb-10 justify-self-center bg-gray-200 dark:bg-indigo-950 shadow-2xl max-w-[350px] min-w-[280px] rounded-xl ">
    <div className="flex items-end h-60">
      <div className="w-full h-full inline-block overflow-hidden relative rounded-t-xl">
        <SkeletonNode
          sx={{
            position: 'absolute',
            left: '0',
            top: '0',
            zIndex: '0',
            objectFit: 'cover',
          }}
          width={'100%'}
          height={'100%'}
        />
      </div>
    </div>
    <div className="flex flex-col px-2 pt-4 md:pt-3 lg:pt-5 ">
      <div className="flex flex-row justify-between items-center pb-4 px-2 md:px-4">
        <SkeletonNode width={120} height={24} />
        <SkeletonNode width={40} height={24} />
      </div>
      <SkeletonNode
        sx={{
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '16px',
        }}
        width={'100%'}
        height={88}
      />
      <div className="flex  justify-between items-center mt-4 mb-3">
        <SkeletonNode sx={{ marginLeft: '32px' }} width={60} height={32} />
        <SkeletonNode sx={{ padding: '8px', borderRadius: '12px' }} width={144} height={40} />
      </div>
    </div>
  </div>
);

export default PizzaCardSkeleton;
