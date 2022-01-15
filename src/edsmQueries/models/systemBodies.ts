/** EDSM API Response. */
export interface ISystemBodies {
  /** System id */
  id: number;
  /** System Name */
  name: string;
  /** System bodies */
  bodies: ISystemBody[];
}

/** Body within a system */
export interface ISystemBody {
  id: number;
  name: string;
  type: string;
  subType: string;
  rings: [] | undefined;
}
