import { useEffect, useState } from "react";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";

//타임라인가로 css
const useStyles = makeStyles({
  timeline: {
    // transform: "rotate(90deg)",
    // marginLeft: 0,
    // position: 'inherit',
    // overflowY: "scroll",
    width: 500,
    // height: 500
  },
  // timelineContentContainer: {
  //   textAlign: "left"
  // },
  // timelineContent: {
  //   display: "inline-block",
  //   transform: "rotate(-90deg)",
  //   textAlign: "center",
  //   minWidth: 50
  // },
  // timelineIcon: {
  //   transform: "rotate(-90deg)"
  // }
});
const MyTriproute = ({ myplace }: any) => {
  // console.log('myplace11', myplace)
  const [myroute, setMyroute] = useState<Array<string>>([]);


  // myplace.map((el: any) => {
  //     console.log('el', el[0].place)
  //     // setMyroute([...myroute].concat(el[0].place))
  // })
  // console.log('myroute', myroute)
  myplace.map((el: any) => {
    el.map((e: any) => {
      // setMyroute([...myroute].concat(e.place))
      // console.log('myroute', myroute)
      // console.log('e', e)
      // console.log('e.place', e.place)
    });
  });

  const classes = useStyles();
  return (
    <>
      {/* <img src={"../img/pic1.jpeg"} /> */}
      <div className="route_body">
        <Timeline
          className={classes.timeline}
        >
          {myplace.map((el: any) => {
            return el.map((e: any) => {
              return (
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot
                    // className={classes.timelineIcon} 
                    />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent
                  // className={classes.timelineContentContainer}
                  >
                    <Paper
                    //  className={classes.timelineContent}
                    >
                      <div className="route_oneofroute">
                        <img src={e.photo} />
                        <div className="descplace">
                          <div className="desplacename">{e.place}</div>
                          <div>{e.address}</div>
                        </div>
                      </div>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              );
            });
          })}
        </Timeline>
      </div>
    </>
  );
};
export default MyTriproute;
