import { EntityState } from "@ngrx/entity";
import { Course } from "../model/course";

// estende il model Course
export interface CoursesState extends EntityState<Course> {
  entities: {[key: number]: Course};
  ids: number[]
}
