import { useEffect, useState } from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import "./CSS/MyTriproute.css";

//타임라인가로 css
const useStyles = makeStyles({
  timeline: {
    // transform: "rotate(90deg)",
    // marginLeft: 0,
    // position: 'inherit',
    // overflowY: "scroll",
    // width: 500,
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
  myplace?.spot?.map((el: any) => {
    el?.map((e: any) => {
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
      <div className="route__body">
        {/* <Timeline className={classes.timeline}> */}
        {myplace?.spot?.map((el: any, idx: number) => {
          return el?.map((e: any) => {
            return (
              <>
                <div className="route__warp">
                  <div className="route__contents">
                    <img src={e.photo} alt="" />
                    <a href={e.photo} target="_blank"></a>

                    <div className="route__content">
                      <div className="route__place">{e.place}</div>
                    </div>
                  </div>
                </div>
                <div className="route__arrow">
                  <img src="./img/arrow.png" alt="" />
                </div>
              </>
            );
          });
        })}
        {/* </Timeline> */}
      </div>
    </>
  );
};
export default MyTriproute;
