import { Tag } from "./tag";
import { User } from "./user";

export interface Goal {
    _id: string,
    _creatorId: string | null,
    _parentId: string,

    title: string,
    description: string,
    start_date: Date,
    end_date: Date,

    subgoals: Goal[],
    depth: number,
    tags: Tag[],

    followers: User[],
    follower_count: number,
    inspired_goals: Goal[]
    inspired_by: Goal | null,
}