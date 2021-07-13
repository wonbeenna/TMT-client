import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../reducers";
import axios from "axios";

function InputListBtn({ startToday, endToday, lists }: any) {
  // let listData2 = useSelector(
  //   (state: RootReducer) => state.savePlaceListReducer.place
  // );
  // const [insertPlace, setInsertPlace] = useState<Array<object>>([]);
  // const [insertPlace, setInsertPlace] = useState<any>([]);

  // useEffect(() => {
  //   lists.map((el: any) => setInsertPlace([...insertPlace].concat(el.place)));
  // }, [lists]);
  // => lists말고 insertPlace하면 하면안되나 왜 무한으로 찍히지..

  // console.log('BtnbeforePlace', insertPlace);

  // const sendHandler = (el: any) => {
  //     const sendURL = `${process.env.REACT_APP_API}/trip/insertSpot`;
  //     axios.post(sendURL,{
  // place: lists,
  // startDate: startToday,
  // endDate: endToday
  //     })
  // el.map((el: any) => {
  //   console.log('el.place', el.place)
  //   setInsertplace(el.place)
  //   console.log('insertplace', insertplace)

  //   })
  // };
  const sendHandler = () => {
    // const sendURL = `${process.env.REACT_APP_API}/trip/insertSpot`;
    // axios.post(sendURL, {
    //   place: insertPlace,
    //   startDate: startToday,
    //   endDate: endToday
    // })
    console.log('Btninsidelists', lists);
    // console.log(startToday, endToday);
    // post >  insertPlace
    // console.log('BtninsideinsertPlace', insertPlace);

    // => drag-drop으로 순서를 바꾸면 insertPlace이 이상하게 바뀐다. 
    // 덕수궁 경복궁 청계천 누르고 경복궁을 삭제하고 덕수궁 청계천 순서바꾸면 
    // BtninsertPlace (5) ["덕수궁", "경복궁", "청계천", "청계천", "덕수궁"]
    // => 삭제를 하면 insertPlace이 이상하게 바뀐다. 
    // 덕수궁 경복궁 청계천 누르고 청계천을 삭제하면 
    // BtninsideinsertPlace (4) ["덕수궁", "경복궁", "청계천", "경복궁"]
    // 덕수궁 경복궁 청계천 누르고 경복궁을 삭제하면
    // BtninsertPlace (4) ["덕수궁", "경복궁", "청계천", "청계천"]
    // => 마지막장소가 한번더 저장이되네
    // 삭제 기능을 추가해야할것같다(쓰레기통눌렀을 때, 저장하기 눌렀을때는 페이지전환 )
    // 마지막을 추가하는코드를 useEffect로해서 그런것같은데 

    // => list는 순서를 바꾼대로 적용이 잘되니깐 POST할때 lists로 보내줘야겠음 (아니,안된다. 정보를 다보내는게아니라 place만 뽑아서 보내야함)
    // => 내일 생각하자
    // console.log('BtnstartToday', startToday)
    // console.log('BtnendToday', endToday)
  };
  // console.log('BtninsertPlace', insertPlace);
  // console.log('Btnlists', lists)
  //place만 뽑아서보내야한다. 
  // let arr: any[]
  // const Arr: any = arr.concat(lists.map((el: object | any) => {
  //   console.log('el', el.place)
  // }))

  // console.log(startToday, endToday);

  // console.log('lists', lists);

  // lists.map((el: object | any) => {
  //   console.log('el', el.place)
  // })

  // console.log(lists);
  // console.log(startToday, endToday);

  // concat은 안될것같음
  // 분리하면 함수가 안읽힘

  return (
    <div className="inputList__save">
      <button className="inputList__saveBtn" onClick={sendHandler}>
        저장하기
      </button>
    </div>
  );
  // {/* <button className="inputList__saveBtn" onClick={() => sendHandler(lists)}> */}
  //이렇게 하면 저장하기 버튼이 사라짐
  // return (
  //   <div className="inputList__save">
  //     {lists.map((el: object | any) => {
  //       const sendHandler = () => {
  //         [...insertplace].concat(el)
  //         console.log('insertplace', insertplace)
  //       }
  //       <button className="inputList__saveBtn" onClick={sendHandler}>
  //         저장하기
  //       </button>
  //     })}
  //   </div>
  // );

}

export default InputListBtn;