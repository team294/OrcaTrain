export class Match {
    public id: number; // assigned by database

    // INFO
    public eventId: string;
    public matchType: string;
    public matchSet: string;
    public matchNumber: string;
    public teamId: string;

    // TELEOP

    public teleopHighGoals = 0;
    public teleopMidGoals = 0;
    public teleopLowGoals = 0;
}
