export class Match {
    public id: number; // assigned by database

    // INFO
    public eventId: string;
    public matchType: string;
    public matchSet: string;
    public matchNumber: string;
    public teamId: string;

    // AUTO
    public autoHighGoals = 0;
    public autoMidGoals = 0;
    public autoLowGoals = 0;

    // TELEOP

    public teleopHighGoals = 0;
    public teleopMidGoals = 0;
    public teleopLowGoals = 0;
}
