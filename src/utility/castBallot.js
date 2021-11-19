import { signMsg } from "./signMsg";
import { generateRandomStr } from "./generateRandomStr";
import { getVoterKey } from "./getVoterKey";

const base_url = 'https://ntu-vote.ntu.im';

//unprotected
export const castBallot = async(cpnId, cid, password) => {
    console.log('casting ballots...');
    try{
        const veriStr = generateRandomStr(5);
        const keyPair = await getVoterKey();
        const votedMsg = `VOTED:${localStorage.getItem("uid")}:${cpnId}`;
        const ballotMsg = `BALLOT:${veriStr}:${cpnId}:${cid}`;
        const votedProof = await signMsg(keyPair, password, votedMsg);
        const ballotProof = await signMsg(keyPair, password, ballotMsg);
        const endpoint = base_url + "/api/ballot/cast";
        const data = JSON.stringify(	{
            "cpnId": cpnId,            // number, campaign id
            "cid": cid,                // number, candidate id
            "votedProof": votedProof,  // string, voted proof
            "ballotProof": ballotProof // string, ballot proof
        });
        const response = await fetch(endpoint, {
            method: "POST",
            body: data,
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                'Authorization': `bearer ${localStorage.getItem("username")}:${localStorage.getItem("token")}`
            }
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.status === "Success"){
                return veriStr;
            }
            else{
                alert(jsonResponse.message);
                if(jsonResponse.message === "ERR_JWT_EXPIRED"){
                    alert("已達登入時間上限，為確保隱私安全，麻煩您在登入一次喔");
                    return "expired";
                }
                if(jsonResponse.message === "ERR_VOTER_ALREADY_VOTED"){
                    alert("一人一票，您已投過此場活動");
                }
                return "fail";
            }
        }
        else{ //404 not found, db crash
            alert(response.status + " " + response.statusText);
            return "fail";
        }
    }
    catch (e) {
        // alert("casting ballot: " + e.message);
        return "fail";
    }
}

