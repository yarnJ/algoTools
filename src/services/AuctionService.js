// Automatically generated with Reach 0.1.6 (66f7fd96)
/* eslint-disable */
export const _version = '0.1.6';
export const _versionHash = '0.1.6 (66f7fd96)';
export const _backendVersion = 5;

export function getExports(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getViews(s, viewlib) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_Token;
  const ctc2 = stdlib.T_UInt;
  
  return {
    infos: {
      Auction: {
        currentPrice: {
          decode: async (i, svs, args) => {
            if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 1))) {
              const [v205, v206, v207, v208, v210] = svs;
              stdlib.assert(false, 'illegal view')
              }
            if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 4))) {
              const [v205, v206, v223, v224, v225, v230, v233, v234] = svs;
              return (await ((async () => {
                
                
                return v223;}))(...args));
              }
            
            stdlib.assert(false, 'illegal view')
            },
          ty: ctc2
          },
        endSecs: {
          decode: async (i, svs, args) => {
            if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 1))) {
              const [v205, v206, v207, v208, v210] = svs;
              stdlib.assert(false, 'illegal view')
              }
            if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 4))) {
              const [v205, v206, v223, v224, v225, v230, v233, v234] = svs;
              return (await ((async () => {
                
                
                return v224;}))(...args));
              }
            
            stdlib.assert(false, 'illegal view')
            },
          ty: ctc2
          },
        highestBidder: {
          decode: async (i, svs, args) => {
            if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 1))) {
              const [v205, v206, v207, v208, v210] = svs;
              stdlib.assert(false, 'illegal view')
              }
            if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 4))) {
              const [v205, v206, v223, v224, v225, v230, v233, v234] = svs;
              return (await ((async () => {
                
                
                return v225;}))(...args));
              }
            
            stdlib.assert(false, 'illegal view')
            },
          ty: ctc0
          },
        token: {
          decode: async (i, svs, args) => {
            if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 1))) {
              const [v205, v206, v207, v208, v210] = svs;
              stdlib.assert(false, 'illegal view')
              }
            if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 4))) {
              const [v205, v206, v223, v224, v225, v230, v233, v234] = svs;
              return (await ((async () => {
                
                
                return v206;}))(...args));
              }
            
            stdlib.assert(false, 'illegal view')
            },
          ty: ctc1
          }
        }
      },
    views: {
      1: [ctc0, ctc1, ctc2, ctc2, ctc2],
      4: [ctc0, ctc1, ctc2, ctc2, ctc0, ctc2, ctc2, ctc2]
      }
    };
  
  };
export function _getMaps(s) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Tuple([]);
  return {
    mapDataTy: ctc0
    };
  };
export async function Auctioneer(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Auctioneer expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Auctioneer expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_UInt;
  const ctc1 = stdlib.T_Token;
  const ctc2 = stdlib.T_Object({
    reservePrice: ctc0,
    timeout: ctc0,
    token: ctc1
    });
  const ctc3 = stdlib.T_Null;
  const ctc4 = stdlib.T_Tuple([ctc0]);
  const ctc5 = stdlib.T_Data({
    Bidder_close0: ctc4,
    Bidder_getBid0: ctc4
    });
  const ctc6 = stdlib.T_Address;
  
  
  const v201 = stdlib.protect(ctc2, await interact.getSale(), {
    at: './auction.rsh:49:36:application',
    fs: ['at ./auction.rsh:44:18:application call to [unknown function] (defined at: ./auction.rsh:44:22:function exp)'],
    msg: 'getSale',
    who: 'Auctioneer'
    });
  const v202 = v201.token;
  const v203 = v201.reservePrice;
  const v204 = v201.timeout;
  
  const txn1 = await (ctc.sendrecv({
    args: [v202, v203, v204],
    evt_cnt: 3,
    funcNum: 0,
    lct: stdlib.checkedBigNumberify('./auction.rsh:52:6:dot', stdlib.UInt_max, 0),
    onlyIf: true,
    out_tys: [ctc1, ctc0, ctc0],
    pay: [v203, []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], mapsPrev: [], mapsNext: [] };
      
      const {data: [v206, v207, v208], secs: v210, time: v209, didSend: v30, from: v205 } = txn1;
      
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 0),
        kind: 'init',
        tok: v206
        });
      sim_r.txns.push({
        amt: v207,
        kind: 'to',
        tok: undefined
        });
      sim_r.isHalt = false;
      
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined,
    tys: [ctc1, ctc0, ctc0],
    waitIfNotPresent: false
    }));
  const {data: [v206, v207, v208], secs: v210, time: v209, didSend: v30, from: v205 } = txn1;
  ;
  ;
  const txn2 = await (ctc.sendrecv({
    args: [v205, v206, v207, v208, v210],
    evt_cnt: 0,
    funcNum: 1,
    lct: v209,
    onlyIf: true,
    out_tys: [],
    pay: [stdlib.checkedBigNumberify('./auction.rsh:57:6:dot', stdlib.UInt_max, 0), [[stdlib.checkedBigNumberify('./auction.rsh:57:12:decimal', stdlib.UInt_max, 1), v206]]],
    sim_p: (async (txn2) => {
      const sim_r = { txns: [], mapRefs: [], mapsPrev: [], mapsNext: [] };
      
      const {data: [], secs: v215, time: v214, didSend: v38, from: v213 } = txn2;
      
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('./auction.rsh:57:6:dot', stdlib.UInt_max, 0),
        kind: 'to',
        tok: undefined
        });
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('./auction.rsh:57:12:decimal', stdlib.UInt_max, 1),
        kind: 'to',
        tok: v206
        });
      const v219 = stdlib.addressEq(v205, v213);
      stdlib.assert(v219, {
        at: './auction.rsh:57:6:dot',
        fs: [],
        msg: 'sender correct',
        who: 'Auctioneer'
        });
      
      const v222 = stdlib.add(v210, v208);
      const v223 = v207;
      const v224 = v222;
      const v225 = v205;
      const v226 = true;
      const v227 = v214;
      const v230 = v215;
      const v233 = v207;
      const v234 = stdlib.checkedBigNumberify('./auction.rsh:57:12:decimal', stdlib.UInt_max, 1);
      
      if ((() => {
        
        return v226;})()) {
        sim_r.isHalt = false;
        }
      else {
        sim_r.txns.push({
          amt: v233,
          kind: 'from',
          to: v205,
          tok: undefined
          });
        sim_r.txns.push({
          amt: v234,
          kind: 'from',
          to: v225,
          tok: v206
          });
        sim_r.txns.push({
          kind: 'halt',
          tok: v206
          })
        sim_r.txns.push({
          kind: 'halt',
          tok: undefined
          })
        sim_r.isHalt = true;
        }
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined,
    tys: [ctc6, ctc1, ctc0, ctc0, ctc0],
    waitIfNotPresent: false
    }));
  const {data: [], secs: v215, time: v214, didSend: v38, from: v213 } = txn2;
  ;
  ;
  const v219 = stdlib.addressEq(v205, v213);
  stdlib.assert(v219, {
    at: './auction.rsh:57:6:dot',
    fs: [],
    msg: 'sender correct',
    who: 'Auctioneer'
    });
  stdlib.protect(ctc3, await interact.signal(), {
    at: './auction.rsh:60:40:application',
    fs: ['at ./auction.rsh:60:18:application call to [unknown function] (defined at: ./auction.rsh:60:22:function exp)'],
    msg: 'signal',
    who: 'Auctioneer'
    });
  
  const v222 = stdlib.add(v210, v208);
  let v223 = v207;
  let v224 = v222;
  let v225 = v205;
  let v226 = true;
  let v227 = v214;
  let v230 = v215;
  let v233 = v207;
  let v234 = stdlib.checkedBigNumberify('./auction.rsh:57:12:decimal', stdlib.UInt_max, 1);
  
  while ((() => {
    
    return v226;})()) {
    const txn3 = await (ctc.recv({
      didSend: false,
      evt_cnt: 1,
      funcNum: 3,
      out_tys: [ctc5],
      timeoutAt: undefined,
      waitIfNotPresent: false
      }));
    const {data: [v258], secs: v260, time: v259, didSend: v137, from: v257 } = txn3;
    switch (v258[0]) {
      case 'Bidder_close0': {
        const v261 = v258[1];
        ;
        undefined;
        const v268 = null;
        await txn3.getOutput('api', 'v268', ctc3, v268);
        const cv223 = v223;
        const cv224 = v224;
        const cv225 = v225;
        const cv226 = false;
        const cv227 = v259;
        const cv230 = v260;
        const cv233 = v233;
        const cv234 = v234;
        
        v223 = cv223;
        v224 = cv224;
        v225 = cv225;
        v226 = cv226;
        v227 = cv227;
        v230 = cv230;
        v233 = cv233;
        v234 = cv234;
        
        continue;
        break;
        }
      case 'Bidder_getBid0': {
        const v295 = v258[1];
        const v296 = v295[stdlib.checkedBigNumberify('./auction.rsh:94:11:spread', stdlib.UInt_max, 0)];
        const v299 = stdlib.add(v233, v296);
        ;
        undefined;
        const v311 = stdlib.gt(v296, v223);
        stdlib.assert(v311, {
          at: './auction.rsh:98:18:application',
          fs: ['at ./auction.rsh:75:19:application call to [unknown function] (defined at: ./auction.rsh:94:11:function exp)'],
          msg: null,
          who: 'Auctioneer'
          });
        const v315 = stdlib.sub(v299, v223);
        ;
        stdlib.protect(ctc3, await interact.seeBid(v257, v296), {
          at: './auction.rsh:1:39:application',
          fs: ['at ./auction.rsh:1:21:application call to [unknown function] (defined at: ./auction.rsh:1:25:function exp)', 'at ./auction.rsh:100:37:application call to "liftedInteract" (defined at: ./auction.rsh:100:37:application)', 'at ./auction.rsh:75:19:application call to [unknown function] (defined at: ./auction.rsh:94:11:function exp)'],
          msg: 'seeBid',
          who: 'Auctioneer'
          });
        
        const v317 = null;
        await txn3.getOutput('api', 'v317', ctc3, v317);
        const v324 = stdlib.sub(v224, stdlib.checkedBigNumberify('./auction.rsh:107:33:decimal', stdlib.UInt_max, 600));
        const v325 = stdlib.gt(v230, v324);
        const v326 = stdlib.add(v224, stdlib.checkedBigNumberify('./auction.rsh:108:36:decimal', stdlib.UInt_max, 900));
        const v327 = v325 ? v326 : v224;
        const cv223 = v296;
        const cv224 = v327;
        const cv225 = v257;
        const cv226 = true;
        const cv227 = v259;
        const cv230 = v260;
        const cv233 = v315;
        const cv234 = v234;
        
        v223 = cv223;
        v224 = cv224;
        v225 = cv225;
        v226 = cv226;
        v227 = cv227;
        v230 = cv230;
        v233 = cv233;
        v234 = cv234;
        
        continue;
        break;
        }
      }
    
    }
  ;
  ;
  return;
  
  
  
  
  };
export async function Bidder_close(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Bidder_close expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Bidder_close expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_Token;
  const ctc2 = stdlib.T_UInt;
  const ctc3 = stdlib.T_Tuple([ctc2]);
  const ctc4 = stdlib.T_Data({
    Bidder_close0: ctc3,
    Bidder_getBid0: ctc3
    });
  const ctc5 = stdlib.T_Null;
  
  
  const [v205, v206, v223, v224, v225, v230, v233, v234] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 4), [ctc0, ctc1, ctc2, ctc2, ctc0, ctc2, ctc2, ctc2]);
  const v247 = stdlib.protect(ctc3, await interact.in(), {
    at: './auction.rsh:1:23:application',
    fs: ['at ./auction.rsh:75:19:application call to [unknown function] (defined at: ./auction.rsh:116:11:function exp)', 'at ./auction.rsh:75:19:application call to "runBidder_close0" (defined at: ./auction.rsh:75:19:function exp)', 'at ./auction.rsh:75:19:application call to [unknown function] (defined at: ./auction.rsh:75:19:function exp)'],
    msg: 'in',
    who: 'Bidder_close'
    });
  
  const v253 = ['Bidder_close0', v247];
  
  const txn1 = await (ctc.sendrecv({
    args: [v205, v206, v223, v224, v225, v230, v233, v234, v253],
    evt_cnt: 1,
    funcNum: 3,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 0),
    onlyIf: true,
    out_tys: [ctc4],
    pay: [stdlib.checkedBigNumberify('./auction.rsh:117:17:decimal', stdlib.UInt_max, 0), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], mapsPrev: [], mapsNext: [] };
      
      const {data: [v258], secs: v260, time: v259, didSend: v137, from: v257 } = txn1;
      
      switch (v258[0]) {
        case 'Bidder_close0': {
          const v261 = v258[1];
          sim_r.txns.push({
            amt: stdlib.checkedBigNumberify('./auction.rsh:117:17:decimal', stdlib.UInt_max, 0),
            kind: 'to',
            tok: undefined
            });
          undefined;
          const v268 = null;
          const v269 = await txn1.getOutput('api', 'v268', ctc5, v268);
          
          sim_r.txns.push({
            amt: v233,
            kind: 'from',
            to: v205,
            tok: undefined
            });
          sim_r.txns.push({
            amt: v234,
            kind: 'from',
            to: v225,
            tok: v206
            });
          sim_r.txns.push({
            kind: 'halt',
            tok: v206
            })
          sim_r.txns.push({
            kind: 'halt',
            tok: undefined
            })
          sim_r.isHalt = true;
          
          break;
          }
        case 'Bidder_getBid0': {
          const v295 = v258[1];
          
          break;
          }
        }
      return sim_r;
      }),
    soloSend: false,
    timeoutAt: undefined,
    tys: [ctc0, ctc1, ctc2, ctc2, ctc0, ctc2, ctc2, ctc2, ctc4],
    waitIfNotPresent: false
    }));
  const {data: [v258], secs: v260, time: v259, didSend: v137, from: v257 } = txn1;
  switch (v258[0]) {
    case 'Bidder_close0': {
      const v261 = v258[1];
      ;
      undefined;
      const v268 = null;
      const v269 = await txn1.getOutput('api', 'v268', ctc5, v268);
      if (v137) {
        stdlib.protect(ctc5, await interact.out(v261, v269), {
          at: './auction.rsh:116:11:application',
          fs: ['at ./auction.rsh:116:11:application call to [unknown function] (defined at: ./auction.rsh:116:11:function exp)', 'at ./auction.rsh:119:12:application call to "k" (defined at: ./auction.rsh:116:11:function exp)', 'at ./auction.rsh:75:19:application call to [unknown function] (defined at: ./auction.rsh:116:11:function exp)'],
          msg: 'out',
          who: 'Bidder_close'
          });
        }
      else {
        }
      
      ;
      ;
      return;
      
      break;
      }
    case 'Bidder_getBid0': {
      const v295 = v258[1];
      return;
      break;
      }
    }
  
  
  };
export async function Bidder_getBid(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Bidder_getBid expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Bidder_getBid expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_Token;
  const ctc2 = stdlib.T_UInt;
  const ctc3 = stdlib.T_Tuple([ctc2]);
  const ctc4 = stdlib.T_Data({
    Bidder_close0: ctc3,
    Bidder_getBid0: ctc3
    });
  const ctc5 = stdlib.T_Null;
  
  
  const [v205, v206, v223, v224, v225, v230, v233, v234] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 4), [ctc0, ctc1, ctc2, ctc2, ctc0, ctc2, ctc2, ctc2]);
  const v239 = stdlib.protect(ctc3, await interact.in(), {
    at: './auction.rsh:1:23:application',
    fs: ['at ./auction.rsh:75:19:application call to [unknown function] (defined at: ./auction.rsh:94:11:function exp)', 'at ./auction.rsh:75:19:application call to "runBidder_getBid0" (defined at: ./auction.rsh:75:19:function exp)', 'at ./auction.rsh:75:19:application call to [unknown function] (defined at: ./auction.rsh:75:19:function exp)'],
    msg: 'in',
    who: 'Bidder_getBid'
    });
  const v240 = v239[stdlib.checkedBigNumberify('./auction.rsh:94:11:spread', stdlib.UInt_max, 0)];
  const v241 = stdlib.gt(v240, v223);
  stdlib.assert(v241, {
    at: './auction.rsh:95:25:application',
    fs: ['at ./auction.rsh:94:11:application call to [unknown function] (defined at: ./auction.rsh:95:16:function exp)', 'at ./auction.rsh:75:19:application call to [unknown function] (defined at: ./auction.rsh:94:11:function exp)', 'at ./auction.rsh:75:19:application call to "runBidder_getBid0" (defined at: ./auction.rsh:75:19:function exp)', 'at ./auction.rsh:75:19:application call to [unknown function] (defined at: ./auction.rsh:75:19:function exp)'],
    msg: 'bid is too low',
    who: 'Bidder_getBid'
    });
  
  const v255 = ['Bidder_getBid0', v239];
  
  const txn1 = await (ctc.sendrecv({
    args: [v205, v206, v223, v224, v225, v230, v233, v234, v255],
    evt_cnt: 1,
    funcNum: 3,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 0),
    onlyIf: true,
    out_tys: [ctc4],
    pay: [v240, []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], mapsPrev: [], mapsNext: [] };
      
      const {data: [v258], secs: v260, time: v259, didSend: v137, from: v257 } = txn1;
      
      switch (v258[0]) {
        case 'Bidder_close0': {
          const v261 = v258[1];
          
          break;
          }
        case 'Bidder_getBid0': {
          const v295 = v258[1];
          const v296 = v295[stdlib.checkedBigNumberify('./auction.rsh:94:11:spread', stdlib.UInt_max, 0)];
          const v299 = stdlib.add(v233, v296);
          sim_r.txns.push({
            amt: v296,
            kind: 'to',
            tok: undefined
            });
          undefined;
          const v311 = stdlib.gt(v296, v223);
          stdlib.assert(v311, {
            at: './auction.rsh:98:18:application',
            fs: ['at ./auction.rsh:75:19:application call to [unknown function] (defined at: ./auction.rsh:94:11:function exp)'],
            msg: null,
            who: 'Bidder_getBid'
            });
          const v315 = stdlib.sub(v299, v223);
          sim_r.txns.push({
            amt: v223,
            kind: 'from',
            to: v225,
            tok: undefined
            });
          const v317 = null;
          const v318 = await txn1.getOutput('api', 'v317', ctc5, v317);
          
          const v324 = stdlib.sub(v224, stdlib.checkedBigNumberify('./auction.rsh:107:33:decimal', stdlib.UInt_max, 600));
          const v325 = stdlib.gt(v230, v324);
          const v326 = stdlib.add(v224, stdlib.checkedBigNumberify('./auction.rsh:108:36:decimal', stdlib.UInt_max, 900));
          const v327 = v325 ? v326 : v224;
          const v871 = v296;
          const v872 = v327;
          const v873 = v257;
          const v876 = v260;
          const v877 = v315;
          const v878 = v234;
          sim_r.isHalt = false;
          
          break;
          }
        }
      return sim_r;
      }),
    soloSend: false,
    timeoutAt: undefined,
    tys: [ctc0, ctc1, ctc2, ctc2, ctc0, ctc2, ctc2, ctc2, ctc4],
    waitIfNotPresent: false
    }));
  const {data: [v258], secs: v260, time: v259, didSend: v137, from: v257 } = txn1;
  switch (v258[0]) {
    case 'Bidder_close0': {
      const v261 = v258[1];
      return;
      break;
      }
    case 'Bidder_getBid0': {
      const v295 = v258[1];
      const v296 = v295[stdlib.checkedBigNumberify('./auction.rsh:94:11:spread', stdlib.UInt_max, 0)];
      const v299 = stdlib.add(v233, v296);
      ;
      undefined;
      const v311 = stdlib.gt(v296, v223);
      stdlib.assert(v311, {
        at: './auction.rsh:98:18:application',
        fs: ['at ./auction.rsh:75:19:application call to [unknown function] (defined at: ./auction.rsh:94:11:function exp)'],
        msg: null,
        who: 'Bidder_getBid'
        });
      const v315 = stdlib.sub(v299, v223);
      ;
      const v317 = null;
      const v318 = await txn1.getOutput('api', 'v317', ctc5, v317);
      if (v137) {
        stdlib.protect(ctc5, await interact.out(v295, v318), {
          at: './auction.rsh:94:11:application',
          fs: ['at ./auction.rsh:94:11:application call to [unknown function] (defined at: ./auction.rsh:94:11:function exp)', 'at ./auction.rsh:101:12:application call to "k" (defined at: ./auction.rsh:94:11:function exp)', 'at ./auction.rsh:75:19:application call to [unknown function] (defined at: ./auction.rsh:94:11:function exp)'],
          msg: 'out',
          who: 'Bidder_getBid'
          });
        }
      else {
        }
      
      const v324 = stdlib.sub(v224, stdlib.checkedBigNumberify('./auction.rsh:107:33:decimal', stdlib.UInt_max, 600));
      const v325 = stdlib.gt(v230, v324);
      const v326 = stdlib.add(v224, stdlib.checkedBigNumberify('./auction.rsh:108:36:decimal', stdlib.UInt_max, 900));
      const v327 = v325 ? v326 : v224;
      const v871 = v296;
      const v872 = v327;
      const v873 = v257;
      const v876 = v260;
      const v877 = v315;
      const v878 = v234;
      return;
      
      break;
      }
    }
  
  
  };
const _ALGO = {
  appApproval: `#pragma version 5
txn RekeyTo
global ZeroAddress
==
assert
txn Lease
global ZeroAddress
==
assert
int 0
store 0
txn ApplicationID
bz alloc
byte base64()
app_global_get
dup
int 0
extract_uint64
store 1
dup
int 8
extract_uint64
store 2
extract 16 32
store 3
txn NumAppArgs
int 3
==
assert
txna ApplicationArgs 0
btoi
preamble:
// Handler 0
dup
int 0
==
bz l0_afterHandler0
pop
// check step
int 0
load 1
==
assert
// check time
txna ApplicationArgs 1
btoi
dup
int 0
==
swap
load 2
==
||
assert
byte base64()
pop
txna ApplicationArgs 2
dup
len
int 56
==
assert
dup
extract 0 32
store 255
dup
int 32
extract_uint64
store 254
dup
int 40
extract_uint64
store 253
dup
int 48
extract_uint64
store 252
pop
txn Sender
global CreatorAddress
==
assert
load 255
store 3
// "CheckPay"
// "./auction.rsh:52:6:dot"
// "[]"
int 100000
dup
bz l1_checkTxnK
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns Amount
==
assert
int pay
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Receiver
==
assert
l1_checkTxnK:
pop
// Initializing token
int 100000
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns Amount
==
assert
int pay
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Receiver
==
assert
l2_checkTxnK:
pop
int 0
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns AssetAmount
==
assert
load 254
dig 1
gtxns XferAsset
==
assert
int axfer
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Sender
==
assert
load 3
dig 1
gtxns AssetReceiver
==
assert
l3_checkTxnK:
pop
// "CheckPay"
// "./auction.rsh:52:6:dot"
// "[]"
load 253
dup
bz l4_checkTxnK
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns Amount
==
assert
int pay
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Receiver
==
assert
l4_checkTxnK:
pop
txn Sender
load 254
itob
concat
load 253
itob
concat
load 252
itob
concat
global LatestTimestamp
itob
concat
int 1
bzero
dig 1
extract 0 64
app_global_put
pop
int 1
store 1
global Round
store 2
txn OnCompletion
int NoOp
==
assert
b updateState
l0_afterHandler0:
// Handler 1
dup
int 1
==
bz l5_afterHandler1
pop
// check step
int 1
load 1
==
assert
// check time
txna ApplicationArgs 1
btoi
dup
int 0
==
swap
load 2
==
||
assert
int 1
bzero
app_global_get
dup
extract 0 32
store 255
dup
int 32
extract_uint64
store 254
dup
int 40
extract_uint64
store 253
dup
int 48
extract_uint64
store 252
dup
int 56
extract_uint64
store 251
pop
txna ApplicationArgs 2
dup
len
int 0
==
assert
pop
// "CheckPay"
// "./auction.rsh:57:6:dot"
// "[]"
// "CheckPay"
// "./auction.rsh:57:6:dot"
// "[]"
int 1
dup
bz l6_checkTxnK
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns AssetAmount
==
assert
load 254
dig 1
gtxns XferAsset
==
assert
int axfer
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns AssetReceiver
==
assert
l6_checkTxnK:
pop
// Just "sender correct"
// "./auction.rsh:57:6:dot"
// "[]"
load 255
txn Sender
==
assert
load 255
load 254
itob
concat
load 253
itob
load 251
load 252
+
itob
concat
load 255
concat
int 1
itob // bool
substring 7 8
concat
global Round
itob
concat
global LatestTimestamp
itob
concat
load 253
itob
concat
byte base64(AAAAAAAAAAE=)
concat
b loopBody2
l5_afterHandler1:
l7_afterHandler2:
// Handler 3
dup
int 3
==
bz l8_afterHandler3
pop
// check step
int 4
load 1
==
assert
// check time
txna ApplicationArgs 1
btoi
dup
int 0
==
swap
load 2
==
||
assert
int 1
bzero
app_global_get
dup
extract 0 32
store 255
dup
int 32
extract_uint64
store 254
dup
int 40
extract_uint64
store 253
dup
int 48
extract_uint64
store 252
dup
extract 56 32
store 251
dup
int 88
extract_uint64
store 250
dup
int 96
extract_uint64
store 249
dup
int 104
extract_uint64
store 248
pop
txna ApplicationArgs 2
dup
len
int 9
==
assert
dup
store 247
pop
load 247
int 0
getbyte
int 0
==
bz l10_switchAfterBidder_close0
// "CheckPay"
// "./auction.rsh:75:19:dot"
// "[]"
byte base64(AAAAAAAAAQw=)
log // 8
byte base64()
load 255
load 254
itob
concat
load 253
itob
load 252
itob
concat
load 251
concat
int 0
itob // bool
substring 7 8
concat
global Round
itob
concat
global LatestTimestamp
itob
concat
load 249
itob
concat
load 248
itob
concat
b loopBody2
l10_switchAfterBidder_close0:
load 247
int 0
getbyte
int 1
==
bz l11_switchAfterBidder_getBid0
load 247
extract 1 8
dup
store 246
btoi
store 245
// "CheckPay"
// "./auction.rsh:75:19:dot"
// "[]"
load 245
dup
bz l12_checkTxnK
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns Amount
==
assert
int pay
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Receiver
==
assert
l12_checkTxnK:
pop
// Nothing
// "./auction.rsh:98:18:application"
// "[at ./auction.rsh:75:19:application call to [unknown function] (defined at: ./auction.rsh:94:11:function exp)]"
load 245
load 253
>
assert
load 253
dup
bz l13_checkTxnK
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns Amount
==
assert
int pay
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Sender
==
assert
load 251
dig 1
gtxns Receiver
==
assert
l13_checkTxnK:
pop
byte base64(AAAAAAAAAT0=)
log // 8
byte base64()
load 255
load 254
itob
concat
load 245
itob
load 252
dup
int 900
+
load 250
load 252
int 600
-
>
select
itob
concat
txn Sender
concat
int 1
itob // bool
substring 7 8
concat
global Round
itob
concat
global LatestTimestamp
itob
concat
load 249
load 245
+
load 253
-
itob
concat
load 248
itob
concat
b loopBody2
l11_switchAfterBidder_getBid0:
l9_switchK:
l8_afterHandler3:
int 0
assert
loopBody2:
dup
int 0
extract_uint64
store 255
dup
int 8
extract_uint64
store 254
dup
extract 16 32
store 253
dup
extract 48 1
btoi
store 252
dup
int 49
extract_uint64
store 251
dup
int 57
extract_uint64
store 250
dup
int 65
extract_uint64
store 249
dup
int 73
extract_uint64
store 248
pop
dup
extract 0 32
store 247
dup
int 32
extract_uint64
store 246
pop
load 252
bz l14_ifF
load 247
load 246
itob
concat
load 255
itob
concat
load 254
itob
concat
load 253
concat
load 250
itob
concat
load 249
itob
concat
load 248
itob
concat
int 1
bzero
dig 1
extract 0 112
app_global_put
pop
int 4
store 1
global Round
store 2
txn OnCompletion
int NoOp
==
assert
b updateState
l14_ifF:
load 249
dup
bz l15_checkTxnK
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns Amount
==
assert
int pay
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Sender
==
assert
load 247
dig 1
gtxns Receiver
==
assert
l15_checkTxnK:
pop
load 248
dup
bz l16_checkTxnK
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns AssetAmount
==
assert
load 246
dig 1
gtxns XferAsset
==
assert
int axfer
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Sender
==
assert
load 253
dig 1
gtxns AssetReceiver
==
assert
l16_checkTxnK:
pop
int 0
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns AssetAmount
==
assert
load 246
dig 1
gtxns XferAsset
==
assert
int axfer
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Sender
==
assert
global CreatorAddress
dig 1
gtxns AssetCloseTo
==
assert
l17_checkTxnK:
pop
int 0
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns Amount
==
assert
int pay
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Sender
==
assert
global CreatorAddress
dig 1
gtxns CloseRemainderTo
==
assert
l18_checkTxnK:
pop
txn OnCompletion
int DeleteApplication
==
assert
updateState:
byte base64()
load 1
itob
load 2
itob
load 3
concat
concat
app_global_put
checkSize:
load 0
dup
dup
int 1
+
global GroupSize
==
assert
txn GroupIndex
==
assert
int 1000
*
txn Fee
<=
assert
done:
int 1
return
alloc:
txn OnCompletion
int NoOp
==
assert
int 0
store 1
int 0
store 2
global ZeroAddress
store 3
b updateState
`,
  appClear: `#pragma version 5
int 0
`,
  escrow: `#pragma version 5
global GroupSize
int 1
-
dup
gtxns TypeEnum
int appl
==
assert
gtxns ApplicationID
int {{ApplicationID}}
==
assert
done:
int 1
`,
  mapDataKeys: 0,
  mapDataSize: 0,
  stateKeys: 1,
  stateSize: 112,
  unsupported: [],
  version: 5
  };
const _ETH = {
  ABI: `[
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "address payable",
                "name": "v206",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "v207",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v208",
                "type": "uint256"
              }
            ],
            "internalType": "struct T2",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T3",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "msg",
        "type": "uint256"
      }
    ],
    "name": "ReachError",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "address payable",
                "name": "v206",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "v207",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v208",
                "type": "uint256"
              }
            ],
            "internalType": "struct T2",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T3",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "e0",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct T8",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "e1",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "enum _enum_T10",
                    "name": "which",
                    "type": "uint8"
                  },
                  {
                    "components": [
                      {
                        "internalType": "uint256",
                        "name": "elem0",
                        "type": "uint256"
                      }
                    ],
                    "internalType": "struct T9",
                    "name": "_Bidder_close0",
                    "type": "tuple"
                  },
                  {
                    "components": [
                      {
                        "internalType": "uint256",
                        "name": "elem0",
                        "type": "uint256"
                      }
                    ],
                    "internalType": "struct T9",
                    "name": "_Bidder_getBid0",
                    "type": "tuple"
                  }
                ],
                "internalType": "struct T10",
                "name": "v258",
                "type": "tuple"
              }
            ],
            "internalType": "struct T11",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T12",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "e3",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bool",
        "name": "v268",
        "type": "bool"
      }
    ],
    "name": "oe_v268",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bool",
        "name": "v317",
        "type": "bool"
      }
    ],
    "name": "oe_v317",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "Auction_currentPrice",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "Auction_endSecs",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "Auction_highestBidder",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "Auction_token",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCreationTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentState",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "internalType": "struct T8",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "m1",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "enum _enum_T10",
                    "name": "which",
                    "type": "uint8"
                  },
                  {
                    "components": [
                      {
                        "internalType": "uint256",
                        "name": "elem0",
                        "type": "uint256"
                      }
                    ],
                    "internalType": "struct T9",
                    "name": "_Bidder_close0",
                    "type": "tuple"
                  },
                  {
                    "components": [
                      {
                        "internalType": "uint256",
                        "name": "elem0",
                        "type": "uint256"
                      }
                    ],
                    "internalType": "struct T9",
                    "name": "_Bidder_getBid0",
                    "type": "tuple"
                  }
                ],
                "internalType": "struct T10",
                "name": "v258",
                "type": "tuple"
              }
            ],
            "internalType": "struct T11",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T12",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "m3",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]`,
  Bytecode: `0x608060405260405162001ab038038062001ab083398101604081905262000026916200028a565b6000805543600355604080518251815260208084015180516001600160a01b0316828401529081015182840152820151606082015290517ff4891e4414bf8401957a5efac856b6847c29bb251f2d96a67dc287e4776e01a09181900360800190a160208082015101516200009e903414600b62000183565b620000e36040518060a0016040528060006001600160a01b0316815260200160006001600160a01b031681526020016000815260200160008152602001600081525090565b3380825260208381018051516001600160a01b039081168386019081528251840151604080880191825293518401516060808901918252426080808b01918252600160008190554390558751808a019a909a5294519095168887015291519187019190915251908501525160a0808501919091528151808503909101815260c0909301905281516200017a926002920190620001ad565b50505062000373565b81620001a95760405163100960cb60e01b81526004810182905260240160405180910390fd5b5050565b828054620001bb9062000336565b90600052602060002090601f016020900481019282620001df57600085556200022a565b82601f10620001fa57805160ff19168380011785556200022a565b828001600101855582156200022a579182015b828111156200022a5782518255916020019190600101906200020d565b50620002389291506200023c565b5090565b5b808211156200023857600081556001016200023d565b604051606081016001600160401b03811182821017156200028457634e487b7160e01b600052604160045260246000fd5b60405290565b600081830360808112156200029e57600080fd5b604080519081016001600160401b0381118282101715620002cf57634e487b7160e01b600052604160045260246000fd5b604052835181526060601f1983011215620002e957600080fd5b620002f362000253565b60208501519092506001600160a01b03811681146200031157600080fd5b8252604084810151602080850191909152606090950151908301529283015250919050565b600181811c908216806200034b57607f821691505b602082108114156200036d57634e487b7160e01b600052602260045260246000fd5b50919050565b61172d80620003836000396000f3fe6080604052600436106100845760003560e01c80638047e42f116100565780638047e42f14610106578063832307571461011b5780639d4c01ec14610130578063ab53f2c614610143578063d336c0691461016657005b80631e93b0f11461008d5780631fa4d584146100b15780633ccbd570146100de5780637963168e146100f357005b3661008b57005b005b34801561009957600080fd5b506003545b6040519081526020015b60405180910390f35b3480156100bd57600080fd5b506100c661017b565b6040516001600160a01b0390911681526020016100a8565b3480156100ea57600080fd5b5061009e6102fc565b61008b610101366004611345565b61047a565b34801561011257600080fd5b506100c6610665565b34801561012757600080fd5b5060015461009e565b61008b61013e36600461135d565b6107e3565b34801561014f57600080fd5b50610158610bb5565b6040516100a892919061139b565b34801561017257600080fd5b5061009e610c52565b60006001600054141561023857600060028054610197906113d5565b80601f01602080910402602001604051908101604052809291908181526020018280546101c3906113d5565b80156102105780601f106101e557610100808354040283529160200191610210565b820191906000526020600020905b8154815290600101906020018083116101f357829003601f168201915b50505050508060200190518101906102289190611426565b905061023660006009610dcc565b505b600460005414156102ed57600060028054610252906113d5565b80601f016020809104026020016040519081016040528092919081815260200182805461027e906113d5565b80156102cb5780601f106102a0576101008083540402835291602001916102cb565b820191906000526020600020905b8154815290600101906020018083116102ae57829003601f168201915b50505050508060200190518101906102e391906114b0565b6080015192915050565b6102f960006009610dcc565b90565b6000600160005414156103b957600060028054610318906113d5565b80601f0160208091040260200160405190810160405280929190818152602001828054610344906113d5565b80156103915780601f1061036657610100808354040283529160200191610391565b820191906000526020600020905b81548152906001019060200180831161037457829003601f168201915b50505050508060200190518101906103a99190611426565b90506103b760006008610dcc565b505b6004600054141561046e576000600280546103d3906113d5565b80601f01602080910402602001604051908101604052809291908181526020018280546103ff906113d5565b801561044c5780601f106104215761010080835404028352916020019161044c565b820191906000526020600020905b81548152906001019060200180831161042f57829003601f168201915b505050505080602001905181019061046491906114b0565b6060015192915050565b6102f960006008610dcc565b61048a600160005414600f610dcc565b6104a48135158061049d57506001548235145b6010610dcc565b6000808055600280546104b6906113d5565b80601f01602080910402602001604051908101604052809291908181526020018280546104e2906113d5565b801561052f5780601f106105045761010080835404028352916020019161052f565b820191906000526020600020905b81548152906001019060200180831161051257829003601f168201915b50505050508060200190518101906105479190611426565b90507f9f41c6cf17ede288cbb2cfbbafdd05b2b2025dea3b047cdb79dbc892d7a9286d826040516105789190611571565b60405180910390a161058c3415600c610dcc565b6105a661059f3383602001516001610df6565b600d610dcc565b80516105be906001600160a01b03163314600e610dcc565b6105c66111fc565b815181516001600160a01b0391821690526020808401518351921691810191909152604083015190820151526060820151608083015161060691906115ac565b6020808301805190910191909152825181516001600160a01b0390911660409182015281516001606090910181905282514360809091015282514260a09091015290840151825160c00152905160e0015261066081610e0e565b505050565b60006001600054141561072257600060028054610681906113d5565b80601f01602080910402602001604051908101604052809291908181526020018280546106ad906113d5565b80156106fa5780601f106106cf576101008083540402835291602001916106fa565b820191906000526020600020905b8154815290600101906020018083116106dd57829003601f168201915b50505050508060200190518101906107129190611426565b90506107206000600a610dcc565b505b600460005414156107d75760006002805461073c906113d5565b80601f0160208091040260200160405190810160405280929190818152602001828054610768906113d5565b80156107b55780601f1061078a576101008083540402835291602001916107b5565b820191906000526020600020905b81548152906001019060200180831161079857829003601f168201915b50505050508060200190518101906107cd91906114b0565b6020015192915050565b6102f96000600a610dcc565b6107f36004600054146014610dcc565b61080d8135158061080657506001548235145b6015610dcc565b60008080556002805461081f906113d5565b80601f016020809104026020016040519081016040528092919081815260200182805461084b906113d5565b80156108985780601f1061086d57610100808354040283529160200191610898565b820191906000526020600020905b81548152906001019060200180831161087b57829003601f168201915b50505050508060200190518101906108b091906114b0565b90506108cd60408051808201909152600060208201908152815290565b7fc365789f23f0e328b18daf69c6cf0345c0a9df1b0f961618474c23d8c93461a0836040516108fc91906115e9565b60405180910390a16000610916604085016020860161163c565b6001811115610927576109276115d3565b1415610a035761093934156011610dcc565b604051600181527f1acb1573e2094f79ec2f51a5196a9bf319618716ea8d9e1d2192c543d157af769060200160405180910390a16109756111fc565b825181516001600160a01b0391821690526020808501518351908316908201526040808601518285018051919091526060808801518251909401939093526080808801518251951694909201939093528251600092019190915281514391015280514260a09091015260c08085015182519091015260e080850151915101526109fd81610e0e565b50505050565b6001610a15604085016020860161163c565b6001811115610a2657610a266115d3565b141561066057610a3e36849003840160608501611657565b80825251610a4f9034146012610dcc565b6040820151815151610a6391106013610dcc565b81608001516001600160a01b03166108fc83604001519081150290604051600060405180830381858888f19350505050158015610aa4573d6000803e3d6000fd5b50604051600181527f1822d54b5432f175fb55e38b7edf0e9ef966bc58cbac853d14cba57348dacec49060200160405180910390a1610ae16111fc565b825181516001600160a01b039182169052602080850151835192169181019190915282515190820151526060830151610b1d90610258906116a7565b8360a0015111610b31578260600151610b43565b6103848360600151610b4391906115ac565b60208083018051909101919091528051336040918201528151600160609091015281514360809091015290514260a09091015283015182515160c0850151610b8b91906115ac565b610b9591906116a7565b60208201805160c0019190915260e080850151915101526109fd81610e0e565b600060606000546002808054610bca906113d5565b80601f0160208091040260200160405190810160405280929190818152602001828054610bf6906113d5565b8015610c435780601f10610c1857610100808354040283529160200191610c43565b820191906000526020600020905b815481529060010190602001808311610c2657829003601f168201915b50505050509050915091509091565b600060016000541415610d0f57600060028054610c6e906113d5565b80601f0160208091040260200160405190810160405280929190818152602001828054610c9a906113d5565b8015610ce75780601f10610cbc57610100808354040283529160200191610ce7565b820191906000526020600020905b815481529060010190602001808311610cca57829003601f168201915b5050505050806020019051810190610cff9190611426565b9050610d0d60006007610dcc565b505b60046000541415610dc457600060028054610d29906113d5565b80601f0160208091040260200160405190810160405280929190818152602001828054610d55906113d5565b8015610da25780601f10610d7757610100808354040283529160200191610da2565b820191906000526020600020905b815481529060010190602001808311610d8557829003601f168201915b5050505050806020019051810190610dba91906114b0565b6040015192915050565b6102f9600060075b81610df25760405163100960cb60e01b8152600481018290526024015b60405180910390fd5b5050565b6000610e0483853085611002565b90505b9392505050565b80602001516060015115610f8357610e7f60405180610100016040528060006001600160a01b0316815260200160006001600160a01b03168152602001600081526020016000815260200160006001600160a01b031681526020016000815260200160008152602001600081525090565b8151516001600160a01b03908116825282516020908101518216818401528084018051516040808601919091528151830151606086015281518101519093166080850152805160a09081015190850152805160c090810151908501525160e090810151908401526004600055436001559051610f5f9183910160006101008201905060018060a01b0380845116835280602085015116602084015260408401516040840152606084015160608401528060808501511660808401525060a083015160a083015260c083015160c083015260e083015160e083015292915050565b60405160208183030381529060405260029080519060200190610660929190611276565b805151602082015160c001516040516001600160a01b039092169181156108fc0291906000818181858888f19350505050158015610fc5573d6000803e3d6000fd5b50610fe9816000015160200151826020015160400151836020015160e001516110dc565b60008080556001819055610fff906002906112fa565b50565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180516001600160e01b03166323b872dd60e01b179052915160009283928392918916918391611069916116be565b60006040518083038185875af1925050503d80600081146110a6576040519150601f19603f3d011682016040523d82523d6000602084013e6110ab565b606091505b50915091506110bc828260016110f0565b50808060200190518101906110d191906116da565b979650505050505050565b6110e783838361112b565b61066057600080fd5b606083156110ff575081610e07565b82511561110f5782518084602001fd5b60405163100960cb60e01b815260048101839052602401610de9565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663a9059cbb60e01b17905291516000928392839291881691839161118a916116be565b60006040518083038185875af1925050503d80600081146111c7576040519150601f19603f3d011682016040523d82523d6000602084013e6111cc565b606091505b50915091506111dd828260026110f0565b50808060200190518101906111f291906116da565b9695505050505050565b60408051608081018252600091810182815260608201929092529081908152602001611271604051806101000160405280600081526020016000815260200160006001600160a01b03168152602001600015158152602001600081526020016000815260200160008152602001600081525090565b905290565b828054611282906113d5565b90600052602060002090601f0160209004810192826112a457600085556112ea565b82601f106112bd57805160ff19168380011785556112ea565b828001600101855582156112ea579182015b828111156112ea5782518255916020019190600101906112cf565b506112f6929150611330565b5090565b508054611306906113d5565b6000825580601f10611316575050565b601f016020900490600052602060002090810190610fff91905b5b808211156112f65760008155600101611331565b60006040828403121561135757600080fd5b50919050565b60006080828403121561135757600080fd5b60005b8381101561138a578181015183820152602001611372565b838111156109fd5750506000910152565b82815260406020820152600082518060408401526113c081606085016020870161136f565b601f01601f1916919091016060019392505050565b600181811c908216806113e957607f821691505b6020821081141561135757634e487b7160e01b600052602260045260246000fd5b80516001600160a01b038116811461142157600080fd5b919050565b600060a0828403121561143857600080fd5b60405160a0810181811067ffffffffffffffff8211171561146957634e487b7160e01b600052604160045260246000fd5b6040526114758361140a565b81526114836020840161140a565b60208201526040830151604082015260608301516060820152608083015160808201528091505092915050565b60006101008083850312156114c457600080fd5b6040519081019067ffffffffffffffff821181831017156114f557634e487b7160e01b600052604160045260246000fd5b816040526115028461140a565b81526115106020850161140a565b602082015260408401516040820152606084015160608201526115356080850161140a565b608082015260a084015160a082015260c084015160c082015260e084015160e0820152809250505092915050565b8015158114610fff57600080fd5b8135815260408101602083013561158781611563565b80151560208401525092915050565b634e487b7160e01b600052601160045260246000fd5b600082198211156115bf576115bf611596565b500190565b80356002811061142157600080fd5b634e487b7160e01b600052602160045260246000fd5b81358152608081016115fd602084016115c4565b6002811061161b57634e487b7160e01b600052602160045260246000fd5b80602084015250604083013560408301526060830135606083015292915050565b60006020828403121561164e57600080fd5b610e07826115c4565b60006020828403121561166957600080fd5b6040516020810181811067ffffffffffffffff8211171561169a57634e487b7160e01b600052604160045260246000fd5b6040529135825250919050565b6000828210156116b9576116b9611596565b500390565b600082516116d081846020870161136f565b9190910192915050565b6000602082840312156116ec57600080fd5b8151610e078161156356fea2646970667358221220c8dfd330147ff8cd8a669bd962c5487ad3b03e203c45b558283a2097d5199f5164736f6c63430008090033`,
  BytecodeLen: 6832,
  Which: `oD`,
  version: 5,
  views: {
    Auction: {
      currentPrice: `Auction_currentPrice`,
      endSecs: `Auction_endSecs`,
      highestBidder: `Auction_highestBidder`,
      token: `Auction_token`
      }
    }
  };
export const _Connectors = {
  ALGO: _ALGO,
  ETH: _ETH
  };
export const _Participants = {
  "Auctioneer": Auctioneer,
  "Bidder_close": Bidder_close,
  "Bidder_getBid": Bidder_getBid
  };
export const _APIs = {
  Bidder: {
    close: Bidder_close,
    getBid: Bidder_getBid
    }
  };
