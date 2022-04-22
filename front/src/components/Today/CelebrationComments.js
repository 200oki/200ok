// import { useState, useEffect, useCallback } from "react";
// import * as Api from "../../api";

function CelebrationComments({ }) {

    return (
        <div style ={{display: 'flex', justifyContent: 'center'}}>
            <form onSubmit={{/** */}} style={{width: 'auto', height: 'auto'}}>
                <input type="text" placeholder="주민들의 생일을 축하해주세요!"/>
                <button type="submit">축하하기</button>
            </form>
        </div>
    )
}

export default CelebrationComments;
