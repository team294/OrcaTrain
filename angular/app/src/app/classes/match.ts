export interface Match {
    id: number; // assigned by database

    // INFO
    eventId: string;
    matchType: string;
    matchSet: string;
    matchNumber: string;
    teamId: string;

    // TELEOP

    teleopHighGoals: number;
    teleopMidGoals: number;
    teleopLowGoals: number;
}
