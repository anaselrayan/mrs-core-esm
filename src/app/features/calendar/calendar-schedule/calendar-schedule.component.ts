import { Component, ViewChild, AfterViewInit } from "@angular/core";
import {
    DayPilot, DayPilotModule,
    DayPilotNavigatorComponent
} from "@daypilot/daypilot-pro-angular";

@Component({
    selector: 'calendar-schedule',
    template: `
    <div class="container">
      <div class="navigator">
        <daypilot-navigator [config]="configNavigator" [events]="events" #navigator></daypilot-navigator>
      </div>

      <div class="content">
        <div class="calendar-scroll" [style.width.px]="totalCalendarWidthPx">
            <daypilot-calendar [config]="configCalendar" [events]="events" #calendar></daypilot-calendar>
        </div>
      </div>
    </div>

  `,
    imports: [
        DayPilotModule,
    ],
    providers: [],
    styles: [`
    .container {
      display: flex;
      flex-direction: row;
    }

    .navigator {
      margin-right: 10px;
    }

    .content {
  flex-grow: 1;
  min-width: 0;
  overflow-x: auto;
}
.calendar-scroll {
  display: block;
}
  `]
})
export class CalendarScheduleComponent implements AfterViewInit {

    @ViewChild("calendar") calendar!: DayPilot.Calendar;
    @ViewChild("navigator") nav!: DayPilotNavigatorComponent;

    events: DayPilot.EventData[] = [];

    desiredColumnWidth = 200;

    get totalCalendarWidthPx(): number {
        const count = this.configCalendar.columns?.length ?? 0;
        return Math.max(count * this.desiredColumnWidth, 600); // ensure a reasonable minimum
    }

    configNavigator: DayPilot.NavigatorConfig = {
        showMonths: 1,
        cellWidth: 25,
        cellHeight: 25,
        selectMode: "Day",
        freeHandSelectionEnabled: true,
        onVisibleRangeChanged: args => {
            this.loadEvents();
        },
        onTimeRangeSelected: args => {
            this.configCalendar.viewType = "Resources";
            this.configCalendar.startDate = args.start;
            this.configCalendar.days = args.days;
        }
    };

    configCalendar: DayPilot.CalendarConfig = {
        viewType: "Resources",
        durationBarVisible: true,
        // heightSpec: "Full",
        columns: [
            {
                name: "Analysis",
                id: "1",
            },
            {
                name: "Draft",
                id: "2"
            },
            {
                name: "Testing",
                id: "3"
            },
            {
                name: "Development",
                id: "4"
            },
            {
                name: "Testing",
                id: "5"
            },
            {
                name: "Development",
                id: "6"
            },
            {
                name: "Testing",
                id: "7"
            },
            {
                name: "Development",
                id: "8"
            },
            {
                name: "Testing",
                id: "9"
            },
            {
                name: "Development",
                id: "10"
            },
            {
                name: "Testing",
                id: "11"
            },
            {
                name: "Development",
                id: "12"
            },
            {
                name: "Testing",
                id: "13"
            },
            {
                name: "Development",
                id: "14"
            },
            {
                name: "Testing",
                id: "15"
            },
            {
                name: "Development",
                id: "16"
            },
            {
                name: "Testing",
                id: "17"
            },
        ],
        snapToGrid: false,
        onTimeRangeSelected: async (args) => {
            const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
            const dp = args.control;
            console.log(args);
            dp.clearSelection();
            if (!modal.result) { return; }
            dp.events.add(new DayPilot.Event({
                start: args.start,
                end: args.end,
                resource: args.resource,
                id: DayPilot.guid(),
                text: modal.result
            }));
        }
    };

    constructor() { }

    ngAfterViewInit(): void {
        this.loadEvents();
    }

    loadEvents(): void {
        // const from = this.nav.control.visibleStart();
        // const to = this.nav.control.visibleEnd();
        // this.ds.getEvents(from, to).subscribe(result => {
        //   this.events = result;
        // });
    }

}