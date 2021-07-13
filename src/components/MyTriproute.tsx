import { useEffect, useState } from "react";

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

  return (
    <>
      {/* <img src={"../img/pic1.jpeg"} /> */}
      <div className="route_body">
        {myplace.map((el: any) => {
          return el.map((e: any) => {
            return (
              <div className="route_oneofroute">
                <img src={e.photo} />
                <p>{e.place}</p>
              </div>
            );
          });
        })}
      </div>
    </>
  );
};
export default MyTriproute;
