import { signMsg } from "./signMsg";
import { generateRandomStr } from "./generateRandomStr";

const base_url = '';

//unprotected
export const castBallot = async(cpnId, cid, password) => {
    const veriStr = generateRandomStr(4);
    const keyPair = await getVoterKey();
    const votedMsg = `VOTED:${localStorage.getItem("uid")}:${cpnId}`;
    const ballotMsg = `BALLOT:${veriStr}:${cpnId}:${cid}`;
    try{
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
                "Content-type": "application/json"
            }
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.status == "Success"){
                return "success";
            }
            else{
                alert(jsonResponse.message);
                return "fail";
            }
        }
        else{ //404 not found, db crash
            alert(response.status + " " + response.statusText);
            return "fail";
        }
    }
    catch (error) { //signMsg error
        alert(error);
        return "fail";
    }
}

