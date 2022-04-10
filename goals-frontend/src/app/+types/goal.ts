export interface Goal {
    _creatorId: string | null,
    _parentId: string,

    title: string,
    description: string,
    start_date: Date,
    end_date: Date,

    subgoals: Goal[],
    depth: number,
    tags: string[],

    followers: string[],
    follower_count: number,
    inspired_goals: string[]
    inspired_by: Goal,
}