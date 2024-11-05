export interface ResourceSales {
  amount: number;
  resourceId: number;
  teacherId: number;
  title: string;
}

export interface CourseSales {
  amount: number;
  courseId: number;
  teacherId: number;
  title: string;
}

export interface ResourceSalesCount {
  salesCount: number;
  teacherId: number;
  resourceId: number;
  title: string;
}
