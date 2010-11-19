YUI.add("dataschema-json",function(C){var A=C.Lang,B={getPath:function(D){var G=null,F=[],E=0;if(D){D=D.replace(/\[(['"])(.*?)\1\]/g,function(I,H,J){F[E]=J;return".@"+(E++);}).replace(/\[(\d+)\]/g,function(I,H){F[E]=parseInt(H,10)|0;return".@"+(E++);}).replace(/^\./,"");if(!/[^\w\.\$@]/.test(D)){G=D.split(".");for(E=G.length-1;E>=0;--E){if(G[E].charAt(0)==="@"){G[E]=F[parseInt(G[E].substr(1),10)];}}}else{}}return G;},getLocationValue:function(G,F){var E=0,D=G.length;for(;E<D;E++){if(A.isObject(F)&&(G[E] in F)){F=F[G[E]];}else{F=undefined;break;}}return F;},apply:function(F,G){var D=G,E={results:[],meta:{}};if(!A.isObject(G)){try{D=C.JSON.parse(G);}catch(H){E.error=H;return E;}}if(A.isObject(D)&&F){if(!A.isUndefined(F.resultListLocator)){E=B._parseResults.call(this,F,D,E);}if(!A.isUndefined(F.metaFields)){E=B._parseMeta(F.metaFields,D,E);}}else{E.error=new Error("JSON schema parse failure");}return E;},_parseResults:function(H,D,G){var F=[],I,E;if(H.resultListLocator){I=B.getPath(H.resultListLocator);if(I){F=B.getLocationValue(I,D);if(F===undefined){G.results=[];E=new Error("JSON results retrieval failure");}else{if(A.isArray(F)){if(A.isArray(H.resultFields)){G=B._getFieldValues.call(this,H.resultFields,F,G);}else{G.results=F;}}else{G.results=[];E=new Error("JSON Schema fields retrieval failure");}}}else{E=new Error("JSON Schema results locator failure");}if(E){G.error=E;}}return G;},_getFieldValues:function(L,Q,E){var G=[],N=L.length,H,F,P,R,K,T,D,J=[],O=[],M=[],S,I;for(H=0;H<N;H++){P=L[H];R=P.key||P;K=P.locator||R;T=B.getPath(K);if(T){if(T.length===1){J[J.length]={key:R,path:T[0]};}else{O[O.length]={key:R,path:T};}}else{}D=(A.isFunction(P.parser))?P.parser:C.Parsers[P.parser+""];if(D){M[M.length]={key:R,parser:D};}}for(H=Q.length-1;H>=0;--H){I={};S=Q[H];if(S){for(F=J.length-1;F>=0;--F){I[J[F].key]=C.DataSchema.Base.parse.call(this,(A.isUndefined(S[J[F].path])?S[F]:S[J[F].path]),J[F]);}for(F=O.length-1;F>=0;--F){I[O[F].key]=C.DataSchema.Base.parse.call(this,(B.getLocationValue(O[F].path,S)),O[F]);}for(F=M.length-1;F>=0;--F){R=M[F].key;I[R]=M[F].parser.call(this,I[R]);if(A.isUndefined(I[R])){I[R]=null;}}G[H]=I;}}E.results=G;return E;},_parseMeta:function(G,D,F){if(A.isObject(G)){var E,H;for(E in G){if(G.hasOwnProperty(E)){H=B.getPath(G[E]);if(H&&D){F.meta[E]=B.getLocationValue(H,D);}}}}else{F.error=new Error("JSON meta data retrieval failure");}return F;}};C.DataSchema.JSON=C.mix(B,C.DataSchema.Base);},"@VERSION@",{requires:["json","dataschema-base"]});