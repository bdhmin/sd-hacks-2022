export interface Goal {
    _parentId: string,

    title: string,
    description: string,
    creator: string,
    start_date: Date,
    end_date: Date,

    subgoals: string[],
    depth: number,
    tags: string[],

    followers: string[],
    follower_count: number,
    inspired_goals: string[]
}