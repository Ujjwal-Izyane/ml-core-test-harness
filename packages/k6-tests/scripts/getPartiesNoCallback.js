import http from 'k6/http';
import { check, fail, sleep, group } from 'k6';
import { Trace } from "../common/trace.js";
import { getTwoItemsFromArray } from "../common/utils.js";


// K6_SCRIPT_FSPIOP_ALS_PAYEE_PARTYID=${__ENV.K6_SCRIPT_FSPIOP_ALS_PAYEE_PARTYID},
// K6_SCRIPT_FSPIOP_PAYER_FSP_ID=${__ENV.K6_SCRIPT_FSPIOP_PAYER_FSP_ID},
// K6_SCRIPT_FSPIOP_PAYEE_FSP_ID=${__ENV.K6_SCRIPT_FSPIOP_PAYEE_FSP_ID},
// K6_SCRIPT_CALLBACK_HANDLER_SERVICE_WS_URL=${__ENV.K6_SCRIPT_CALLBACK_HANDLER_SERVICE_WS_URL},

console.log(`Env Vars -->
  K6_SCRIPT_WS_TIMEOUT_MS=${__ENV.K6_SCRIPT_WS_TIMEOUT_MS},
  K6_SCRIPT_FSPIOP_ALS_ENDPOINT_URL=${__ENV.K6_SCRIPT_FSPIOP_ALS_ENDPOINT_URL},
  K6_SCRIPT_ADMIN_ENDPOINT_URL=${__ENV.K6_SCRIPT_ADMIN_ENDPOINT_URL},
  K6_SCRIPT_ORACLE_ENDPOINT_URL=${__ENV.K6_SCRIPT_ORACLE_ENDPOINT_URL},
  K6_SCRIPT_FSPIOP_FSP_POOL=${__ENV.K6_SCRIPT_FSPIOP_FSP_PAYER_POOL}
`);

const fspList = JSON.parse(__ENV.K6_SCRIPT_FSPIOP_FSP_POOL)

export function getPartiesNoCallback() {
  group("Get Parties", function () {
    let payerFsp
    let payeeFsp

    if (__ENV.UNIDIRECTIONAL === "true" || __ENV.UNIDIRECTIONAL === "TRUE") {
      payerFsp = fspList[0]
      payeeFsp =  fspList[1]
    } else {
      const selectedFsps = getTwoItemsFromArray(fspList)
      payerFsp = selectedFsps[0]
      payeeFsp =  selectedFsps[1]
    }

    const startTs = Date.now();
    const payeeId = payeeFsp['partyId'];
    const payerFspId = payerFsp['fspId'];
    const payeeFspId = payeeFsp['fspId'];
    const traceParent = Trace();

    const params = {
      tags: {
        payerFspId,
        payeeFspId
      },
      headers: {
        'Accept': 'application/vnd.interoperability.parties+json;version=1.1',
        'Content-Type': 'application/vnd.interoperability.parties+json;version=1.1',
        'FSPIOP-Source': payerFspId,
        'Date': (new Date()).toUTCString(),
        'traceparent': traceParent.toString(),
        'tracestate': `tx_end2end_start_ts=${startTs}`
      },
    };

    // Lets send the FSPIOP GET /parties request to the ALS
    const res = http.get(`${__ENV.K6_SCRIPT_FSPIOP_ALS_ENDPOINT_URL}/parties/MSISDN/${payeeId}`, params);
    check(res, { 'ALS_FSPIOP_GET_PARTIES_RESPONSE_IS_202' : (r) => r.status == 202 });

  });
}
