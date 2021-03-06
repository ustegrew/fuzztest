/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.model.abstracts {
    /**
     * @author peter
     */
    export class TInheritChain {
        public static kPathSeparator : string = ".";

        private fChain : fuzztest.utils.storage.TArrayMap<fuzztest.model.abstracts.TClass>;

        constructor() {
            this.fChain = <any>(new fuzztest.utils.storage.TArrayMap<any>());
        }

        public GetAsString$() : string {
            let ret : string;
            ret = this._GetAsString(false);
            return ret;
        }

        public GetAsString(isDetailed? : any) : any {
            if(((typeof isDetailed === 'boolean') || isDetailed === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let ret : string;
                    ret = this._GetAsString(isDetailed);
                    return ret;
                })();
            } else if(isDetailed === undefined) {
                return <any>this.GetAsString$();
            } else throw new Error('invalid overload');
        }

        /**
         * Returns the i-th parent in this inheritance chain.
         * 
         * @param   i   The number of generations above. Zero is the the referred class itself,
         * 1 (one) the first parent generation etc.
         * @return      The parent class that it i generations above the class hosting this chain.
         */
        public GetLink(i : number) : fuzztest.model.abstracts.TClass {
            let ret : fuzztest.model.abstracts.TClass;
            ret = this.fChain.Get(i);
            return ret;
        }

        public GetNumLinks() : number {
            let ret : number;
            ret = this.fChain.GetNumElements();
            return ret;
        }

        public IsLink(c : fuzztest.model.abstracts.TClass) : boolean {
            let i : number;
            let n : number;
            let c0 : fuzztest.model.abstracts.TClass;
            let cID : string;
            let cID0 : string;
            let isEq : boolean;
            let ret : boolean;
            ret = false;
            n = this.fChain.GetNumElements();
            cID = c.GetCanonicalPath();
            if(n >= 1) {
                for(i = 0; i < n; i++) {
                    c0 = this.fChain.Get(i);
                    cID0 = c0.GetCanonicalPath();
                    isEq = (cID === cID0);
                    ret = ret || isEq;
                }
            }
            return ret;
        }

        Add(c : fuzztest.model.abstracts.TClass) {
            let key : string;
            key = c.GetName();
            this.fChain.Add(key, c);
        }

        private _GetAsString(isDetailed : boolean) : string {
            let i : number;
            let n : number;
            let c : fuzztest.model.abstracts.TClass;
            let pSep : string;
            let ret : string;
            pSep = isDetailed?"\n":TInheritChain.kPathSeparator;
            ret = "";
            n = this.fChain.GetNumElements();
            if(n >= 1) {
                for(i = n - 1; i >= 0; i--) {
                    c = this.fChain.Get(i);
                    ret += isDetailed?c.GetCanonicalPath():c.GetName();
                    if(i > 0) {
                        ret += pSep;
                    }
                }
            }
            return ret;
        }
    }
    TInheritChain["__classname"] = "fuzztest.model.abstracts.TInheritChain";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.model.abstracts {
    /**
     * @author peter
     */
    export class TClass {
        public static kNullID : string = "anonymous";

        public static Create(obj : fuzztest.generator.VBrowseable) : TClass {
            let obj0 : Object;
            let ret : TClass;
            obj0 = <Object>(<any>obj);
            ret = new TClass(obj0);
            return ret;
        }

        private fCanonicalPath : string;

        private fInheritPath : string;

        private fInherits : fuzztest.model.abstracts.TInheritChain;

        private fName : string;

        constructor(obj : Object) {
            let proto : Object;
            let constr : Object;
            let cls : TClass;
            let cPath : string;
            this.fCanonicalPath = TClass.kNullID;
            this.fName = TClass.kNullID;
            this.fInheritPath = TClass.kNullID;
            this.fInherits = new fuzztest.model.abstracts.TInheritChain();
            proto = null;
            if(obj != null) {
                proto = <Object>obj["__proto__"];
                if(proto != null) {
                    constr = <Object>proto["constructor"];
                    if(constr != null) {
                        this.fName = <string>constr["name"];
                        this.fInherits.Add(this);
                        while((proto != null)){
                            cls = new TClass(proto);
                            proto = <Object>proto["__proto__"];
                            if(proto != null) {
                                this.fInherits.Add(cls);
                            }
                        };
                        this.fInheritPath = this.fInherits.GetAsString();
                    }
                }
            }
            proto = <Object>Object.getPrototypeOf(obj);
            if(proto != null) {
                constr = <Object>proto["constructor"];
                if(constr != null) {
                    cPath = <string>constr["__classname"];
                    if(cPath != null) {
                        this.fCanonicalPath = cPath;
                    }
                }
            }
        }

        public GetAsString() : string {
            let ret : string;
            ret = this.fCanonicalPath + "(" + this.fInheritPath + ")";
            return ret;
        }

        public GetCanonicalPath() : string {
            return this.fCanonicalPath;
        }

        public GetInheritPath$() : string {
            return this.fInheritPath;
        }

        public GetInheritPath(isDetailed? : any) : any {
            if(((typeof isDetailed === 'boolean') || isDetailed === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let ret : string;
                    ret = this.fInherits.GetAsString(isDetailed);
                    return ret;
                })();
            } else if(isDetailed === undefined) {
                return <any>this.GetInheritPath$();
            } else throw new Error('invalid overload');
        }

        public GetName() : string {
            return this.fName;
        }

        public GetParent() : TClass {
            let nLinks : number;
            let ret : TClass;
            nLinks = this.fInherits.GetNumLinks();
            ret = null;
            if(nLinks >= 2) {
                ret = this.fInherits.GetLink(1);
            }
            return ret;
        }

        public IsEqualTo(other : TClass) : boolean {
            let ret : boolean;
            ret = this._IsEqualTo(other);
            return ret;
        }

        public IsEqualToOrDerivedFrom(other : TClass) : boolean {
            let isEq : boolean;
            let isDer : boolean;
            let ret : boolean;
            isEq = this._IsEqualTo(other);
            isDer = other.fInherits.IsLink(this);
            ret = isEq || isDer;
            return ret;
        }

        private _IsEqualTo(other : TClass) : boolean {
            let ret : boolean;
            ret = (this.fCanonicalPath === other.fCanonicalPath);
            return ret;
        }
    }
    TClass["__classname"] = "fuzztest.model.abstracts.TClass";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest {
    /**
     * @author peter
     */
    export class TMain {
        /**
         * @param args
         */
        public static main(args : string[]) {
            fuzztest._dev_concepts.math.rnd.TDevRnd_01.RunRnd_01();
            fuzztest._dev_concepts.math.rnd.TDevRnd_02.RunRnd_02();
            fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_02.CreateType();
            fuzztest._dev_concepts.objects.repo.del.TDevRepoDel_01.TRepoDelTest_01();
            fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevQueryObject_01.Query();
            fuzztest._dev_concepts.grammar.build.TDevBuildGrammar_01.TestTree01();
            fuzztest._dev_concepts.grammar.build.TDevBuildGrammar_02.TestBuild();
        }
    }
    TMain["__classname"] = "fuzztest.TMain";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest._dev_concepts.math.rnd {
    /**
     * @author peter
     * 
     * Output:
     * 
     * 2016-11-15 07:47:53.425 bundle.js:289 =========================================================
     * 2016-11-15 07:47:53.425 bundle.js:290 TDevRnd_02
     * 2016-11-15 07:47:53.425 bundle.js:291 =========================================================
     * 2016-11-15 07:47:53.426 bundle.js:292 GetDouble
     * 2016-11-15 07:47:53.426 bundle.js:293 ------------------------------------------
     * 2016-11-15 07:47:53.428 bundle.js:296 0.548813502304256
     * 2016-11-15 07:47:53.428 bundle.js:296 0.5928446163889021
     * 2016-11-15 07:47:53.429 bundle.js:296 0.715189364971593
     * 2016-11-15 07:47:53.429 bundle.js:296 0.8442657440900803
     * 2016-11-15 07:47:53.429 bundle.js:296 0.6027633703779429
     * 2016-11-15 07:47:53.430 bundle.js:296 0.8579456198494881
     * 2016-11-15 07:47:53.430 bundle.js:296 0.5448831773828715
     * 2016-11-15 07:47:53.430 bundle.js:296 0.8472517372574657
     * 2016-11-15 07:47:53.431 bundle.js:296 0.42365479678846896
     * 2016-11-15 07:47:53.431 bundle.js:296 0.6235636963974684
     * 2016-11-15 07:47:53.431 bundle.js:296 0.6458941150922328
     * 2016-11-15 07:47:53.432 bundle.js:296 0.3843817082233727
     * 2016-11-15 07:47:53.432 bundle.js:296 0.43758720997720957
     * 2016-11-15 07:47:53.433 bundle.js:296 0.29753460525535047
     * 2016-11-15 07:47:53.433 bundle.js:296 0.8917730017565191
     * 2016-11-15 07:47:53.433 bundle.js:296 0.05671297572553158
     * 2016-11-15 07:47:53.434 bundle.js:296 0.963662764057517
     * 2016-11-15 07:47:53.435 bundle.js:296 0.27265629451721907
     * 2016-11-15 07:47:53.435 bundle.js:296 0.38344152132049203
     * 2016-11-15 07:47:53.436 bundle.js:296 0.4776651116553694
     * 2016-11-15 07:47:53.436 bundle.js:296 0.79172503342852
     * 2016-11-15 07:47:53.436 bundle.js:296 0.8121687264647335
     * 2016-11-15 07:47:53.437 bundle.js:296 0.5288949215319008
     * 2016-11-15 07:47:53.437 bundle.js:296 0.4799771714024246
     * 2016-11-15 07:47:53.437 bundle.js:296 0.568044563755393
     * 2016-11-15 07:47:53.438 bundle.js:296 0.3927847931627184
     * 2016-11-15 07:47:53.438 bundle.js:296 0.925596633227542
     * 2016-11-15 07:47:53.438 bundle.js:296 0.8360787688288838
     * 2016-11-15 07:47:53.438 bundle.js:296 0.07103605871088803
     * 2016-11-15 07:47:53.439 bundle.js:296 0.3373961616307497
     * 2016-11-15 07:47:53.439 bundle.js:296 0.08712929696775973
     * 2016-11-15 07:47:53.439 bundle.js:296 0.6481718765571713
     * 2016-11-15 07:47:53.440 bundle.js:296 0.020218399120494723
     * 2016-11-15 07:47:53.440 bundle.js:296 0.3682415373623371
     * 2016-11-15 07:47:53.440 bundle.js:296 0.8326198428403586
     * 2016-11-15 07:47:53.441 bundle.js:296 0.9571551543194801
     * 2016-11-15 07:47:53.441 bundle.js:296 0.778156756889075
     * 2016-11-15 07:47:53.441 bundle.js:296 0.14035077742300928
     * 2016-11-15 07:47:53.441 bundle.js:296 0.8700121452566236
     * 2016-11-15 07:47:53.442 bundle.js:296 0.8700872510671616
     * 2016-11-15 07:47:53.442 bundle.js:298 ------------------------------------------
     * 2016-11-15 07:47:53.443 bundle.js:299 GetIntBetween (2, 4)
     * 2016-11-15 07:47:53.443 bundle.js:300------------------------------------------
     * 2016-11-15 07:47:53.444 bundle.js:303 4
     * 2016-11-15 07:47:53.444 bundle.js:303 3
     * 2016-11-15 07:47:53.445 bundle.js:303 4
     * 2016-11-15 07:47:53.445 bundle.js:303 4
     * 2016-11-15 07:47:53.445 bundle.js:303 3
     * 2016-11-15 07:47:53.446 bundle.js:303 3
     * 2016-11-15 07:47:53.446 bundle.js:303 4
     * 2016-11-15 07:47:53.446 bundle.js:303 4
     * 2016-11-15 07:47:53.447 bundle.js:303 2
     * 2016-11-15 07:47:53.447 bundle.js:303 4
     * 2016-11-15 07:47:53.448 bundle.js:303 3
     * 2016-11-15 07:47:53.448 bundle.js:303 3
     * 2016-11-15 07:47:53.449 bundle.js:303 2
     * 2016-11-15 07:47:53.449 bundle.js:303 3
     * 2016-11-15 07:47:53.449 bundle.js:303 4
     * 2016-11-15 07:47:53.450 bundle.js:303 4
     * 2016-11-15 07:47:53.450 bundle.js:303 3
     * 2016-11-15 07:47:53.450 bundle.js:303 2
     * 2016-11-15 07:47:53.451 bundle.js:303 3
     * 2016-11-15 07:47:53.451 bundle.js:303 3
     * 2016-11-15 07:47:53.452 bundle.js:303 2
     * 2016-11-15 07:47:53.452 bundle.js:303 2
     * 2016-11-15 07:47:53.452 bundle.js:303 4
     * 2016-11-15 07:47:53.453 bundle.js:303 4
     * 2016-11-15 07:47:53.454 bundle.js:303 3
     * 2016-11-15 07:47:53.454 bundle.js:303 2
     * 2016-11-15 07:47:53.454 bundle.js:303 3
     * 2016-11-15 07:47:53.455 bundle.js:303 2
     * 2016-11-15 07:47:53.455 bundle.js:303 2
     * 2016-11-15 07:47:53.456 bundle.js:303 2
     * 2016-11-15 07:47:53.456 bundle.js:303 3
     * 2016-11-15 07:47:53.456 bundle.js:303 2
     * 2016-11-15 07:47:53.457 bundle.js:303 3
     * 2016-11-15 07:47:53.457 bundle.js:303 2
     * 2016-11-15 07:47:53.457 bundle.js:303 3
     * 2016-11-15 07:47:53.458 bundle.js:303 3
     * 2016-11-15 07:47:53.458 bundle.js:303 4
     * 2016-11-15 07:47:53.458 bundle.js:303 4
     * 2016-11-15 07:47:53.459 bundle.js:303 4
     * 2016-11-15 07:47:53.459 bundle.js:303 3
     * 2016-11-15 07:47:53.459 bundle.js:305 ------------------------------------------
     * 2016-11-15 07:47:53.460 bundle.js:306 GetIntBetween (-1, 1)
     * 2016-11-15 07:47:53.460 bundle.js:307 ------------------------------------------
     * 2016-11-15 07:47:53.460 bundle.js:310 0
     * 2016-11-15 07:47:53.461 bundle.js:310 0
     * 2016-11-15 07:47:53.461 bundle.js:310 0
     * 2016-11-15 07:47:53.461 bundle.js:310 1
     * 2016-11-15 07:47:53.462 bundle.js:310 1
     * 2016-11-15 07:47:53.462 bundle.js:310 -1
     * 2016-11-15 07:47:53.463 bundle.js:310 -1
     * 2016-11-15 07:47:53.463 bundle.js:310 1
     * 2016-11-15 07:47:53.463 bundle.js:310 1
     * 2016-11-15 07:47:53.464 bundle.js:310 0
     * 2016-11-15 07:47:53.464 bundle.js:310 1
     * 2016-11-15 07:47:53.464 bundle.js:310 -1
     * 2016-11-15 07:47:53.465 bundle.js:310 -1
     * 2016-11-15 07:47:53.465 bundle.js:310 0
     * 2016-11-15 07:47:53.465 bundle.js:310 -1
     * 2016-11-15 07:47:53.465 bundle.js:310 1
     * 2016-11-15 07:47:53.466 bundle.js:310 -1
     * 2016-11-15 07:47:53.466 bundle.js:310 0
     * 2016-11-15 07:47:53.466 bundle.js:310 0
     * 2016-11-15 07:47:53.467 bundle.js:310 -1
     * 2016-11-15 07:47:53.467 bundle.js:310 0
     * 2016-11-15 07:47:53.468 bundle.js:310 -1
     * 2016-11-15 07:47:53.468 bundle.js:310 0
     * 2016-11-15 07:47:53.469 bundle.js:310 0
     * 2016-11-15 07:47:53.469 bundle.js:310 1
     * 2016-11-15 07:47:53.469 bundle.js:310 1
     * 2016-11-15 07:47:53.469 bundle.js:310 -1
     * 2016-11-15 07:47:53.470 bundle.js:310 0
     * 2016-11-15 07:47:53.470 bundle.js:310 -1
     * 2016-11-15 07:47:53.470 bundle.js:310 0
     * 2016-11-15 07:47:53.471 bundle.js:310 -1
     * 2016-11-15 07:47:53.471 bundle.js:310 1
     * 2016-11-15 07:47:53.472 bundle.js:310 0
     * 2016-11-15 07:47:53.472 bundle.js:310 0
     * 2016-11-15 07:47:53.472 bundle.js:310 -1
     * 2016-11-15 07:47:53.473 bundle.js:310 0
     * 2016-11-15 07:47:53.473 bundle.js:310 0
     * 2016-11-15 07:47:53.473 bundle.js:310 0
     * 2016-11-15 07:47:53.473 bundle.js:310 -1
     * 2016-11-15 07:47:53.474 bundle.js:310 0
     * 2016-11-15 07:47:53.474 bundle.js:312 ------------------------------------------
     * 2016-11-15 07:47:53.474 bundle.js:313 GetBoolean ()
     * 2016-11-15 07:47:53.475 bundle.js:314 ------------------------------------------
     * 2016-11-15 07:47:53.475 bundle.js:317 false
     * 2016-11-15 07:47:53.475 bundle.js:317 false
     * 2016-11-15 07:47:53.476 bundle.js:317 false
     * 2016-11-15 07:47:53.476 bundle.js:317 true
     * 2016-11-15 07:47:53.476 bundle.js:317 true
     * 2016-11-15 07:47:53.477 bundle.js:317 false
     * 2016-11-15 07:47:53.477 bundle.js:317 false
     * 2016-11-15 07:47:53.477 bundle.js:317 true
     * 2016-11-15 07:47:53.478 bundle.js:317 false
     * 2016-11-15 07:47:53.478 bundle.js:317 true
     * 2016-11-15 07:47:53.478 bundle.js:317 false
     * 2016-11-15 07:47:53.479 bundle.js:317 true
     * 2016-11-15 07:47:53.479 bundle.js:317 true
     * 2016-11-15 07:47:53.480 bundle.js:317 false
     * 2016-11-15 07:47:53.480 bundle.js:317 false
     * 2016-11-15 07:47:53.480 bundle.js:317 true
     * 2016-11-15 07:47:53.480 bundle.js:317 true
     * 2016-11-15 07:47:53.481 bundle.js:317 true
     * 2016-11-15 07:47:53.481 bundle.js:317 false
     * 2016-11-15 07:47:53.481 bundle.js:317 true
     * 2016-11-15 07:47:53.482 bundle.js:317 true
     * 2016-11-15 07:47:53.482 bundle.js:317 true
     * 2016-11-15 07:47:53.482 bundle.js:317 false
     * 2016-11-15 07:47:53.483 bundle.js:317 true
     * 2016-11-15 07:47:53.483 bundle.js:317 true
     * 2016-11-15 07:47:53.483 bundle.js:317 false
     * 2016-11-15 07:47:53.483 bundle.js:317 true
     * 2016-11-15 07:47:53.484 bundle.js:317 false
     * 2016-11-15 07:47:53.484 bundle.js:317 true
     * 2016-11-15 07:47:53.484 bundle.js:317 false
     * 2016-11-15 07:47:53.485 bundle.js:317 false
     * 2016-11-15 07:47:53.485 bundle.js:317 false
     * 2016-11-15 07:47:53.485 bundle.js:317 false
     * 2016-11-15 07:47:53.486 bundle.js:317 true
     * 2016-11-15 07:47:53.486 bundle.js:317 false
     * 2016-11-15 07:47:53.486 bundle.js:317 false
     * 2016-11-15 07:47:53.487 bundle.js:317 false
     * 2016-11-15 07:47:53.487 bundle.js:317 false
     * 2016-11-15 07:47:53.488 bundle.js:317 false
     * 2016-11-15 07:47:53.488 bundle.js:317 true
     */
    export class TDevRnd_02 {
        static kN : number = 40;

        public static RunRnd_02() {
            let i : number;
            let x : number;
            let b : boolean;
            console.log();
            console.log("=========================================================");
            console.log("TDevRnd_02");
            console.log("=========================================================");
            console.log("GetDouble");
            console.log("------------------------------------------");
            for(i = 0; i < TDevRnd_02.kN; i++) {
                x = fuzztest.utils.gen.TGenData.GetDouble();
                console.log(x);
            }
            console.log("------------------------------------------");
            console.log("GetIntBetween (2, 4)");
            console.log("------------------------------------------");
            for(i = 0; i < TDevRnd_02.kN; i++) {
                x = fuzztest.utils.gen.TGenData.GetIntBetween(2, 4);
                console.log(x);
            }
            console.log("------------------------------------------");
            console.log("GetIntBetween (-1, 1)");
            console.log("------------------------------------------");
            for(i = 0; i < TDevRnd_02.kN; i++) {
                x = fuzztest.utils.gen.TGenData.GetIntBetween(-1, 1);
                console.log(x);
            }
            console.log("------------------------------------------");
            console.log("GetBoolean ()");
            console.log("------------------------------------------");
            for(i = 0; i < TDevRnd_02.kN; i++) {
                b = fuzztest.utils.gen.TGenData.GetBoolean();
                console.log(b);
            }
        }
    }
    TDevRnd_02["__classname"] = "fuzztest._dev_concepts.math.rnd.TDevRnd_02";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest._dev_concepts.math.rnd {
    /**
     * @author peter
     * 
     * Output (excerpt):
     * 
     * 2016-11-15 07:47:53.339 bundle.js:230 =========================================================
     * 2016-11-15 07:47:53.344 bundle.js:231 TDevRnd_01
     * 2016-11-15 07:47:53.345 bundle.js:232 =========================================================
     * 2016-11-15 07:47:53.345 bundle.js:233 GetDouble
     * 2016-11-15 07:47:53.346 bundle.js:234 ------------------------------------------
     * 2016-11-15 07:47:53.348 bundle.js:237 0.548813502304256
     * 2016-11-15 07:47:53.348 bundle.js:237 0.5928446163889021
     * 2016-11-15 07:47:53.349 bundle.js:237 0.715189364971593
     * 2016-11-15 07:47:53.349 bundle.js:237 0.8442657440900803
     * 2016-11-15 07:47:53.349 bundle.js:237 0.6027633703779429
     * 2016-11-15 07:47:53.350 bundle.js:237 0.8579456198494881
     * 2016-11-15 07:47:53.350 bundle.js:237 0.5448831773828715
     * 2016-11-15 07:47:53.350 bundle.js:237 0.8472517372574657
     * 2016-11-15 07:47:53.351 bundle.js:237 0.42365479678846896
     * 2016-11-15 07:47:53.351 bundle.js:237 0.6235636963974684
     * 2016-11-15 07:47:53.352 bundle.js:237 0.6458941150922328
     * 2016-11-15 07:47:53.352 bundle.js:237 0.3843817082233727
     * 2016-11-15 07:47:53.352 bundle.js:237 0.43758720997720957
     * 2016-11-15 07:47:53.353 bundle.js:237 0.29753460525535047
     * 2016-11-15 07:47:53.353 bundle.js:237 0.8917730017565191
     * 2016-11-15 07:47:53.353 bundle.js:237 0.05671297572553158
     * 2016-11-15 07:47:53.354 bundle.js:237 0.963662764057517
     * 2016-11-15 07:47:53.354 bundle.js:237 0.27265629451721907
     * 2016-11-15 07:47:53.354 bundle.js:237 0.38344152132049203
     * 2016-11-15 07:47:53.355 bundle.js:237 0.4776651116553694
     * 2016-11-15 07:47:53.355 bundle.js:237 0.79172503342852
     * 2016-11-15 07:47:53.355 bundle.js:237 0.8121687264647335
     * 2016-11-15 07:47:53.355 bundle.js:237 0.5288949215319008
     * 2016-11-15 07:47:53.356 bundle.js:237 0.4799771714024246
     * 2016-11-15 07:47:53.356 bundle.js:237 0.568044563755393
     * 2016-11-15 07:47:53.356 bundle.js:237 0.3927847931627184
     * 2016-11-15 07:47:53.357 bundle.js:237 0.925596633227542
     * 2016-11-15 07:47:53.357 bundle.js:237 0.8360787688288838
     * 2016-11-15 07:47:53.357 bundle.js:237 0.07103605871088803
     * 2016-11-15 07:47:53.358 bundle.js:237 0.3373961616307497
     * 2016-11-15 07:47:53.358 bundle.js:237 0.08712929696775973
     * 2016-11-15 07:47:53.358 bundle.js:237 0.6481718765571713
     * 2016-11-15 07:47:53.358 bundle.js:237 0.020218399120494723
     * 2016-11-15 07:47:53.359 bundle.js:237 0.3682415373623371
     * 2016-11-15 07:47:53.359 bundle.js:237 0.8326198428403586
     * 2016-11-15 07:47:53.360 bundle.js:237 0.9571551543194801
     * 2016-11-15 07:47:53.360 bundle.js:237 0.778156756889075
     * 2016-11-15 07:47:53.360 bundle.js:237 0.14035077742300928
     * 2016-11-15 07:47:53.361 bundle.js:237 0.8700121452566236
     * 2016-11-15 07:47:53.361 bundle.js:237 0.8700872510671616
     * 2016-11-15 07:47:53.361 bundle.js:239 ------------------------------------------
     * 2016-11-15 07:47:53.361 bundle.js:240 GetIntBetween (2, 4)
     * 2016-11-15 07:47:53.362 bundle.js:241 ------------------------------------------
     * 2016-11-15 07:47:53.362 bundle.js:244 4
     * 2016-11-15 07:47:53.363 bundle.js:244 3
     * 2016-11-15 07:47:53.363 bundle.js:244 4
     * 2016-11-15 07:47:53.366 bundle.js:244 4
     * 2016-11-15 07:47:53.367 bundle.js:244 3
     * 2016-11-15 07:47:53.367 bundle.js:244 3
     * 2016-11-15 07:47:53.367 bundle.js:244 4
     * 2016-11-15 07:47:53.367 bundle.js:244 4
     * 2016-11-15 07:47:53.368 bundle.js:244 2
     * 2016-11-15 07:47:53.368 bundle.js:244 4
     * 2016-11-15 07:47:53.369 bundle.js:244 3
     * 2016-11-15 07:47:53.369 bundle.js:244 3
     * 2016-11-15 07:47:53.369 bundle.js:244 2
     * 2016-11-15 07:47:53.369 bundle.js:244 3
     * 2016-11-15 07:47:53.370 bundle.js:244 4
     * 2016-11-15 07:47:53.370 bundle.js:244 4
     * 2016-11-15 07:47:53.372 bundle.js:244 3
     * 2016-11-15 07:47:53.373 bundle.js:244 2
     * 2016-11-15 07:47:53.373 bundle.js:244 3
     * 2016-11-15 07:47:53.373 bundle.js:244 3
     * 2016-11-15 07:47:53.374 bundle.js:244 2
     * 2016-11-15 07:47:53.374 bundle.js:244 2
     * 2016-11-15 07:47:53.374 bundle.js:244 4
     * 2016-11-15 07:47:53.375 bundle.js:244 4
     * 2016-11-15 07:47:53.375 bundle.js:244 3
     * 2016-11-15 07:47:53.376 bundle.js:244 2
     * 2016-11-15 07:47:53.379 bundle.js:244 3
     * 2016-11-15 07:47:53.380 bundle.js:244 2
     * 2016-11-15 07:47:53.381 bundle.js:244 2
     * 2016-11-15 07:47:53.381 bundle.js:244 2
     * 2016-11-15 07:47:53.381 bundle.js:244 3
     * 2016-11-15 07:47:53.382 bundle.js:244 2
     * 2016-11-15 07:47:53.383 bundle.js:244 3
     * 2016-11-15 07:47:53.383 bundle.js:244 2
     * 2016-11-15 07:47:53.384 bundle.js:244 3
     * 2016-11-15 07:47:53.384 bundle.js:244 3
     * 2016-11-15 07:47:53.384 bundle.js:244 4
     * 2016-11-15 07:47:53.385 bundle.js:244 4
     * 2016-11-15 07:47:53.385 bundle.js:244 4
     * 2016-11-15 07:47:53.385 bundle.js:244 3
     * 2016-11-15 07:47:53.386 bundle.js:246 ------------------------------------------
     * 2016-11-15 07:47:53.386 bundle.js:247 GetIntBetween (-1, 1)
     * 2016-11-15 07:47:53.386 bundle.js:248 ------------------------------------------
     * 2016-11-15 07:47:53.387 bundle.js:251 0
     * 2016-11-15 07:47:53.387 bundle.js:251 0
     * 2016-11-15 07:47:53.387 bundle.js:251 0
     * 2016-11-15 07:47:53.388 bundle.js:251 1
     * 2016-11-15 07:47:53.388 bundle.js:251 1
     * 2016-11-15 07:47:53.388 bundle.js:251 -1
     * 2016-11-15 07:47:53.388 bundle.js:251 -1
     * 2016-11-15 07:47:53.389 bundle.js:251 1
     * 2016-11-15 07:47:53.389 bundle.js:251 1
     * 2016-11-15 07:47:53.389 bundle.js:251 0
     * 2016-11-15 07:47:53.390 bundle.js:251 1
     * 2016-11-15 07:47:53.390 bundle.js:251 -1
     * 2016-11-15 07:47:53.390 bundle.js:251 -1
     * 2016-11-15 07:47:53.391 bundle.js:251 0
     * 2016-11-15 07:47:53.391 bundle.js:251 -1
     * 2016-11-15 07:47:53.391 bundle.js:251 1
     * 2016-11-15 07:47:53.392 bundle.js:251 -1
     * 2016-11-15 07:47:53.392 bundle.js:251 0
     * 2016-11-15 07:47:53.392 bundle.js:251 0
     * 2016-11-15 07:47:53.392 bundle.js:251 -1
     * 2016-11-15 07:47:53.393 bundle.js:251 0
     * 2016-11-15 07:47:53.393 bundle.js:251 -1
     * 2016-11-15 07:47:53.394 bundle.js:251 0
     * 2016-11-15 07:47:53.394 bundle.js:251 0
     * 2016-11-15 07:47:53.394 bundle.js:251 1
     * 2016-11-15 07:47:53.395 bundle.js:251 1
     * 2016-11-15 07:47:53.395 bundle.js:251 -1
     * 2016-11-15 07:47:53.395 bundle.js:251 0
     * 2016-11-15 07:47:53.396 bundle.js:251 -1
     * 2016-11-15 07:47:53.396 bundle.js:251 0
     * 2016-11-15 07:47:53.396 bundle.js:251 -1
     * 2016-11-15 07:47:53.396 bundle.js:251 1
     * 2016-11-15 07:47:53.397 bundle.js:251 0
     * 2016-11-15 07:47:53.397 bundle.js:251 0
     * 2016-11-15 07:47:53.397 bundle.js:251 -1
     * 2016-11-15 07:47:53.398 bundle.js:251 0
     * 2016-11-15 07:47:53.398 bundle.js:251 0
     * 2016-11-15 07:47:53.398 bundle.js:251 0
     * 2016-11-15 07:47:53.399 bundle.js:251 -1
     * 2016-11-15 07:47:53.399 bundle.js:251 0
     * 2016-11-15 07:47:53.399 bundle.js:253 ------------------------------------------
     * 2016-11-15 07:47:53.401 bundle.js:254 GetBoolean ()
     * 2016-11-15 07:47:53.402 bundle.js:255 ------------------------------------------
     * 2016-11-15 07:47:53.402 bundle.js:258 false
     * 2016-11-15 07:47:53.402 bundle.js:258 false
     * 2016-11-15 07:47:53.403 bundle.js:258 false
     * 2016-11-15 07:47:53.403 bundle.js:258 true
     * 2016-11-15 07:47:53.404 bundle.js:258 true
     * 2016-11-15 07:47:53.404 bundle.js:258 false
     * 2016-11-15 07:47:53.404 bundle.js:258 false
     * 2016-11-15 07:47:53.405 bundle.js:258 true
     * 2016-11-15 07:47:53.405 bundle.js:258 false
     * 2016-11-15 07:47:53.405 bundle.js:258 true
     * 2016-11-15 07:47:53.406 bundle.js:258 false
     * 2016-11-15 07:47:53.406 bundle.js:258 true
     * 2016-11-15 07:47:53.406 bundle.js:258 true
     * 2016-11-15 07:47:53.406 bundle.js:258 false
     * 2016-11-15 07:47:53.407 bundle.js:258 false
     * 2016-11-15 07:47:53.407 bundle.js:258 true
     * 2016-11-15 07:47:53.407 bundle.js:258 true
     * 2016-11-15 07:47:53.408 bundle.js:258 true
     * 2016-11-15 07:47:53.408 bundle.js:258 false
     * 2016-11-15 07:47:53.409 bundle.js:258 true
     * 2016-11-15 07:47:53.409 bundle.js:258 true
     * 2016-11-15 07:47:53.410 bundle.js:258 true
     * 2016-11-15 07:47:53.410 bundle.js:258 false
     * 2016-11-15 07:47:53.410 bundle.js:258 true
     * 2016-11-15 07:47:53.411 bundle.js:258 true
     * 2016-11-15 07:47:53.411 bundle.js:258 false
     * 2016-11-15 07:47:53.418 bundle.js:258 true
     * 2016-11-15 07:47:53.418 bundle.js:258 false
     * 2016-11-15 07:47:53.419 bundle.js:258 true
     * 2016-11-15 07:47:53.419 bundle.js:258 false
     * 2016-11-15 07:47:53.420 bundle.js:258 false
     * 2016-11-15 07:47:53.421 bundle.js:258 false
     * 2016-11-15 07:47:53.421 bundle.js:258 false
     * 2016-11-15 07:47:53.421 bundle.js:258 true
     * 2016-11-15 07:47:53.422 bundle.js:258 false
     * 2016-11-15 07:47:53.422 bundle.js:258 false
     * 2016-11-15 07:47:53.423 bundle.js:258 false
     * 2016-11-15 07:47:53.423 bundle.js:258 false
     * 2016-11-15 07:47:53.424 bundle.js:258 false
     * 2016-11-15 07:47:53.424 bundle.js:258 true
     */
    export class TDevRnd_01 {
        static kN : number = 40;

        public static RunRnd_01() {
            let i : number;
            let x : number;
            let b : boolean;
            let rndGen : fuzztest.utils.gen.TRndMT;
            rndGen = new fuzztest.utils.gen.TRndMT();
            console.log();
            console.log("=========================================================");
            console.log("TDevRnd_01");
            console.log("=========================================================");
            console.log("GetDouble");
            console.log("------------------------------------------");
            for(i = 0; i < TDevRnd_01.kN; i++) {
                x = rndGen.GetDouble();
                console.log(x);
            }
            console.log("------------------------------------------");
            console.log("GetIntBetween (2, 4)");
            console.log("------------------------------------------");
            for(i = 0; i < TDevRnd_01.kN; i++) {
                x = rndGen.GetIntBetween(2, 4);
                console.log(x);
            }
            console.log("------------------------------------------");
            console.log("GetIntBetween (-1, 1)");
            console.log("------------------------------------------");
            for(i = 0; i < TDevRnd_01.kN; i++) {
                x = rndGen.GetIntBetween(-1, 1);
                console.log(x);
            }
            console.log("------------------------------------------");
            console.log("GetBoolean ()");
            console.log("------------------------------------------");
            for(i = 0; i < TDevRnd_01.kN; i++) {
                b = rndGen.GetBoolean();
                console.log(b);
            }
        }
    }
    TDevRnd_01["__classname"] = "fuzztest._dev_concepts.math.rnd.TDevRnd_01";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest._dev_concepts.grammar.build {
    /**
     * Concept test: Build grammar tree
     * 
     * @author peter
     * 
     * Output:
     * 
     * 2016-11-15 08:07:38.365 bundle.js:770 =========================================================
     * 2016-11-15 08:07:38.365 bundle.js:771 TDevBuildGrammar_01
     * 2016-11-15 08:07:38.365 bundle.js:772 =========================================================
     * 2016-11-15 08:07:38.371 bundle.js:786 w9f_5_n9x0
     * 2016-11-15 08:07:38.372 bundle.js:787 77 39 66 5f 35 5f 6e 39 78 30 NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN
     * 2016-11-15 08:07:38.373 bundle.js:802 ?_s?5#7tlo
     * 2016-11-15 08:07:38.373 bundle.js:803 2c4 5f 73 2f34 35 23 37 74 6c 6f NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN
     */
    export class TDevBuildGrammar_01 {
        static kNChars : number = 20;

        public static TestTree01() {
            let cc : fuzztest.generator.rule.cClass.TCharacterClass;
            let ch : string;
            let chx : string;
            let s0 : string;
            let s1 : string;
            console.log();
            console.log("=========================================================");
            console.log("TDevBuildGrammar_01");
            console.log("=========================================================");
            fuzztest.generator.TRepository.Clear();
            cc = new fuzztest.generator.rule.cClass.TCharacterClass(new fuzztest.generator.rule._common.TAttributeSet(null, 9, fuzztest.generator.rule._common.ERuleAdhesion.kFollowRule, 9, false));
            cc.AddRange("a", "z");
            cc.AddRange("0", "9");
            cc.AddPoint("_");
            s0 = "";
            s1 = "";
            for(let i : number = 1; i <= TDevBuildGrammar_01.kNChars + 2; i++) {
                ch = <string><any>cc.CreateData("");
                chx = <string><any>(<number>new Number(ch.charCodeAt(0))).toString(16);
                s0 += ch;
                s1 += chx + " ";
            }
            console.log(s0);
            console.log(s1);
            console.log();
            fuzztest.generator.TRepository.Clear();
            cc = new fuzztest.generator.rule.cClass.TCharacterClass(new fuzztest.generator.rule._common.TAttributeSet(null, 9, fuzztest.generator.rule._common.ERuleAdhesion.kInjectInvalids, 9, false));
            cc.AddRange("a", "z");
            cc.AddRange("0", "9");
            cc.AddPoint("_");
            s0 = "";
            s1 = "";
            for(let i : number = 1; i <= TDevBuildGrammar_01.kNChars + 2; i++) {
                ch = <string><any>cc.CreateData("");
                chx = <string><any>(<number>new Number(ch.charCodeAt(0))).toString(16);
                s0 += ch;
                s1 += chx + " ";
            }
            console.log(s0);
            console.log(s1);
        }
    }
    TDevBuildGrammar_01["__classname"] = "fuzztest._dev_concepts.grammar.build.TDevBuildGrammar_01";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest._dev_concepts.grammar.build {
    /**
     * @author peter
     * 
     * Output (excerpt):
     * 
     * 2016-11-15 08:07:38.378 bundle.js:905 =========================================================
     * 2016-11-15 08:07:38.378 bundle.js:906 TDevBuildGrammar_02
     * 2016-11-15 08:07:38.378 bundle.js:907 =========================================================
     * 2016-11-15 08:07:38.381 bundle.js:911 hello-==2
     * 2016-11-15 08:07:38.383 bundle.js:911 hello-world=c
     * 2016-11-15 08:07:38.383 bundle.js:911 hello-==a
     * 2016-11-15 08:07:38.384 bundle.js:911 hello-==3
     * 2016-11-15 08:07:38.385 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.388 bundle.js:911 hello-worldworld7
     * 2016-11-15 08:07:38.388 bundle.js:911 hello-world=9
     * 2016-11-15 08:07:38.390 bundle.js:911 hello--world4
     * 2016-11-15 08:07:38.391 bundle.js:911 hello--world2
     * 2016-11-15 08:07:38.392 bundle.js:911 hello--=c
     * 2016-11-15 08:07:38.394 bundle.js:911 hello-worldhello*
     * 2016-11-15 08:07:38.394 bundle.js:911 hello--=5
     * 2016-11-15 08:07:38.395 bundle.js:911 hello-==*
     * 2016-11-15 08:07:38.397 bundle.js:911 hello-hello=*
     * 2016-11-15 08:07:38.398 bundle.js:911 hello-hello-d
     * 2016-11-15 08:07:38.399 bundle.js:911 hello-worldhello*
     * 2016-11-15 08:07:38.400 bundle.js:911 hello-worldworld9
     * 2016-11-15 08:07:38.401 bundle.js:911 hello-worldhello*
     * 2016-11-15 08:07:38.403 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.404 bundle.js:911 hello-==e
     * 2016-11-15 08:07:38.406 bundle.js:911 hello-hellohello*
     * 2016-11-15 08:07:38.407 bundle.js:911 hello-world=4
     * 2016-11-15 08:07:38.407 bundle.js:911 hello-hello=9
     * 2016-11-15 08:07:38.408 bundle.js:911 hello-=helloc
     * 2016-11-15 08:07:38.409 bundle.js:911 hello-world=b
     * 2016-11-15 08:07:38.409 bundle.js:911 hello---*
     * 2016-11-15 08:07:38.412 bundle.js:911 hello-hello-*
     * 2016-11-15 08:07:38.414 bundle.js:911 hello-worldworldd
     * 2016-11-15 08:07:38.415 bundle.js:911 hello-=world0
     * 2016-11-15 08:07:38.416 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.416 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.417 bundle.js:911 hello-world=8
     * 2016-11-15 08:07:38.418 bundle.js:911 hello-world=f
     * 2016-11-15 08:07:38.419 bundle.js:911 hello--hello*
     * 2016-11-15 08:07:38.420 bundle.js:911 hello-hello=7
     * 2016-11-15 08:07:38.420 bundle.js:911 hello--=*
     * 2016-11-15 08:07:38.421 bundle.js:911 hello-worldhello*
     * 2016-11-15 08:07:38.422 bundle.js:911 hello---e
     * 2016-11-15 08:07:38.423 bundle.js:911 hello-worldworld*
     * 2016-11-15 08:07:38.423 bundle.js:911 hello-worldhelloe
     * 2016-11-15 08:07:38.424 bundle.js:911 hello--=6
     * 2016-11-15 08:07:38.425 bundle.js:911 hello-world=c
     * 2016-11-15 08:07:38.425 bundle.js:911 hello--=b
     * 2016-11-15 08:07:38.426 bundle.js:911 hello-hello-c
     * 2016-11-15 08:07:38.426 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.427 bundle.js:911 hello-world=0
     * 2016-11-15 08:07:38.428 bundle.js:911 hello-world-7
     * 2016-11-15 08:07:38.429 bundle.js:911 hello-worldworldc
     * 2016-11-15 08:07:38.430 bundle.js:911 hello-worldhellof
     * 2016-11-15 08:07:38.432 bundle.js:911 hello-=-*
     * 2016-11-15 08:07:38.433 bundle.js:911 hello-world=0
     * 2016-11-15 08:07:38.434 bundle.js:911 hello-worldhello7
     * 2016-11-15 08:07:38.434 bundle.js:911 hello---*
     * 2016-11-15 08:07:38.435 bundle.js:911 hello-world=e
     * 2016-11-15 08:07:38.436 bundle.js:911 hello--helloe
     * 2016-11-15 08:07:38.437 bundle.js:911 hello--=b
     * 2016-11-15 08:07:38.438 bundle.js:911 hello-hello-*
     * 2016-11-15 08:07:38.439 bundle.js:911 hello-=worlda
     * 2016-11-15 08:07:38.440 bundle.js:911 hello-worldhellod
     * 2016-11-15 08:07:38.441 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.441 bundle.js:911 hello-world-*
     * 2016-11-15 08:07:38.442 bundle.js:911 hello-hellohello9
     * 2016-11-15 08:07:38.443 bundle.js:911 hello-==b
     * 2016-11-15 08:07:38.443 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.444 bundle.js:911 hello--=e
     * 2016-11-15 08:07:38.445 bundle.js:911 hello-world=2
     * 2016-11-15 08:07:38.445 bundle.js:911 hello-worldhellof
     * 2016-11-15 08:07:38.446 bundle.js:911 hello-==c
     * 2016-11-15 08:07:38.447 bundle.js:911 hello-world=c
     * 2016-11-15 08:07:38.447 bundle.js:911 hello-==*
     * 2016-11-15 08:07:38.448 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.449 bundle.js:911 hello-worldhellof
     * 2016-11-15 08:07:38.450 bundle.js:911 hello-world-*
     * 2016-11-15 08:07:38.451 bundle.js:911 hello-world-1
     * 2016-11-15 08:07:38.452 bundle.js:911 hello-=hello5
     * 2016-11-15 08:07:38.453 bundle.js:911 hello-hello=*
     * 2016-11-15 08:07:38.453 bundle.js:911 hello-==c
     * 2016-11-15 08:07:38.454 bundle.js:911 hello-world=c
     * 2016-11-15 08:07:38.455 bundle.js:911 hello-world-0
     * 2016-11-15 08:07:38.456 bundle.js:911 hello--=*
     * 2016-11-15 08:07:38.462 bundle.js:911 hello-world-*
     * 2016-11-15 08:07:38.463 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.464 bundle.js:911 hello-=helloa
     * 2016-11-15 08:07:38.465 bundle.js:911 hello-hello=e
     * 2016-11-15 08:07:38.465 bundle.js:911 hello--worldf
     * 2016-11-15 08:07:38.466 bundle.js:911 hello-hello-*
     * 2016-11-15 08:07:38.466 bundle.js:911 hello-world-*
     * 2016-11-15 08:07:38.467 bundle.js:911 hello---6
     * 2016-11-15 08:07:38.467 bundle.js:911 hello-=-8
     * 2016-11-15 08:07:38.468 bundle.js:911 hello-=hello6
     * 2016-11-15 08:07:38.468 bundle.js:911 hello-==e
     * 2016-11-15 08:07:38.469 bundle.js:911 hello-hellohello0
     * 2016-11-15 08:07:38.470 bundle.js:911 hello-=hello*
     * 2016-11-15 08:07:38.470 bundle.js:911 hello-worldhelloe
     * 2016-11-15 08:07:38.471 bundle.js:911 hello-helloworldb
     * 2016-11-15 08:07:38.471 bundle.js:911 hello--=*
     * 2016-11-15 08:07:38.472 bundle.js:911 hello-worldhelloc
     * 2016-11-15 08:07:38.472 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.473 bundle.js:911 hello-worldworld2
     * 2016-11-15 08:07:38.474 bundle.js:911 hello-world-1
     * 2016-11-15 08:07:38.474 bundle.js:911 hello-worldhello*
     * 2016-11-15 08:07:38.474 bundle.js:911 hello-world=0
     * 2016-11-15 08:07:38.475 bundle.js:911 hello-==*
     * 2016-11-15 08:07:38.476 bundle.js:911 hello-==c
     * 2016-11-15 08:07:38.476 bundle.js:911 hello-=world6
     * 2016-11-15 08:07:38.477 bundle.js:911 hello-worldworlda
     * 2016-11-15 08:07:38.477 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.478 bundle.js:911 hello-worldhellob
     * 2016-11-15 08:07:38.479 bundle.js:911 hello-world-5
     * 2016-11-15 08:07:38.479 bundle.js:911 hello-world=4
     * 2016-11-15 08:07:38.480 bundle.js:911 hello-==8
     * 2016-11-15 08:07:38.483 bundle.js:911 hello-worldhello*
     * 2016-11-15 08:07:38.484 bundle.js:911 hello--=*
     * 2016-11-15 08:07:38.484 bundle.js:911 hello-world-*
     * 2016-11-15 08:07:38.486 bundle.js:911 hello-world=a
     * 2016-11-15 08:07:38.486 bundle.js:911 hello-=-3
     * 2016-11-15 08:07:38.487 bundle.js:911 hello-hello=*
     * 2016-11-15 08:07:38.487 bundle.js:911 hello-worldworlde
     * 2016-11-15 08:07:38.488 bundle.js:911 hello-=hello0
     * 2016-11-15 08:07:38.489 bundle.js:911 hello-hellohello8
     * 2016-11-15 08:07:38.489 bundle.js:911 hello-hello=6
     * 2016-11-15 08:07:38.490 bundle.js:911 hello--hello2
     * 2016-11-15 08:07:38.490 bundle.js:911 hello-world-*
     * 2016-11-15 08:07:38.491 bundle.js:911 hello-hello=2
     * 2016-11-15 08:07:38.492 bundle.js:911 hello-worldhello3
     * 2016-11-15 08:07:38.493 bundle.js:911 hello-==c
     * 2016-11-15 08:07:38.494 bundle.js:911 hello-world=0
     * 2016-11-15 08:07:38.494 bundle.js:911 hello-==*
     * 2016-11-15 08:07:38.496 bundle.js:911 hello-hello=3
     * 2016-11-15 08:07:38.496 bundle.js:911 hello-==c
     * 2016-11-15 08:07:38.497 bundle.js:911 hello--worldc
     * 2016-11-15 08:07:38.498 bundle.js:911 hello--=c
     * 2016-11-15 08:07:38.499 bundle.js:911 hello-worldhellob
     * 2016-11-15 08:07:38.500 bundle.js:911 hello--=b
     * 2016-11-15 08:07:38.500 bundle.js:911 hello-worldworldf
     * 2016-11-15 08:07:38.501 bundle.js:911 hello-hello=*
     * 2016-11-15 08:07:38.501 bundle.js:911 hello-hello-f
     * 2016-11-15 08:07:38.502 bundle.js:911 hello--=0
     * 2016-11-15 08:07:38.502 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.503 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.503 bundle.js:911 hello---*
     * 2016-11-15 08:07:38.503 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.504 bundle.js:911 hello-worldworld2
     * 2016-11-15 08:07:38.504 bundle.js:911 hello-==2
     * 2016-11-15 08:07:38.505 bundle.js:911 hello-world=9
     * 2016-11-15 08:07:38.508 bundle.js:911 hello-==c
     * 2016-11-15 08:07:38.508 bundle.js:911 hello-worldworld*
     * 2016-11-15 08:07:38.509 bundle.js:911 hello-worldworld7
     * 2016-11-15 08:07:38.509 bundle.js:911 hello--=*
     * 2016-11-15 08:07:38.510 bundle.js:911 hello--=*
     * 2016-11-15 08:07:38.510 bundle.js:911 hello-hellohelloa
     * 2016-11-15 08:07:38.511 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.511 bundle.js:911 hello--=*
     * 2016-11-15 08:07:38.511 bundle.js:911 hello-=-9
     * 2016-11-15 08:07:38.512 bundle.js:911 hello-helloworldb
     * 2016-11-15 08:07:38.512 bundle.js:911 hello--=0
     * 2016-11-15 08:07:38.512 bundle.js:911 hello-world=3
     * 2016-11-15 08:07:38.513 bundle.js:911 hello-world=b
     * 2016-11-15 08:07:38.513 bundle.js:911 hello-=-8
     * 2016-11-15 08:07:38.514 bundle.js:911 hello--=c
     * 2016-11-15 08:07:38.514 bundle.js:911 hello-world=9
     * 2016-11-15 08:07:38.514 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.515 bundle.js:911 hello-worldworldd
     * 2016-11-15 08:07:38.515 bundle.js:911 hello-worldworld*
     * 2016-11-15 08:07:38.516 bundle.js:911 hello-=worldb
     * 2016-11-15 08:07:38.516 bundle.js:911 hello--hello5
     * 2016-11-15 08:07:38.516 bundle.js:911 hello-worldhello4
     * 2016-11-15 08:07:38.517 bundle.js:911 hello-hello-d
     * 2016-11-15 08:07:38.517 bundle.js:911 hello--=*
     * 2016-11-15 08:07:38.517 bundle.js:911 hello-worldhello2
     * 2016-11-15 08:07:38.518 bundle.js:911 hello-world=e
     * 2016-11-15 08:07:38.518 bundle.js:911 hello-worldhello*
     * 2016-11-15 08:07:38.519 bundle.js:911 hello-worldworldd
     * 2016-11-15 08:07:38.519 bundle.js:911 hello-world=a
     * 2016-11-15 08:07:38.520 bundle.js:911 hello-world=8
     * 2016-11-15 08:07:38.520 bundle.js:911 hello-world=3
     * 2016-11-15 08:07:38.520 bundle.js:911 hello-==*
     * 2016-11-15 08:07:38.521 bundle.js:911 hello-worldworld6
     * 2016-11-15 08:07:38.521 bundle.js:911 hello-world-*
     * 2016-11-15 08:07:38.522 bundle.js:911 hello-worldworld8
     * 2016-11-15 08:07:38.522 bundle.js:911 hello-world=3
     * 2016-11-15 08:07:38.522 bundle.js:911 hello--=8
     * 2016-11-15 08:07:38.523 bundle.js:911 hello-world=9
     * 2016-11-15 08:07:38.523 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.523 bundle.js:911 hello-world=b
     * 2016-11-15 08:07:38.524 bundle.js:911 hello-worldhello*
     * 2016-11-15 08:07:38.524 bundle.js:911 hello-hello-*
     * 2016-11-15 08:07:38.525 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.525 bundle.js:911 hello-worldworldd
     * 2016-11-15 08:07:38.525 bundle.js:911 hello-hello=1
     * 2016-11-15 08:07:38.526 bundle.js:911 hello--world*
     * 2016-11-15 08:07:38.527 bundle.js:911 hello-=hello0
     * 2016-11-15 08:07:38.527 bundle.js:911 hello-world-b
     * 2016-11-15 08:07:38.528 bundle.js:911 hello-worldhelloe
     * 2016-11-15 08:07:38.528 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.529 bundle.js:911 hello-=-4
     * 2016-11-15 08:07:38.529 bundle.js:911 hello-worldhellof
     * 2016-11-15 08:07:38.530 bundle.js:911 hello--world*
     * 2016-11-15 08:07:38.530 bundle.js:911 hello-==*
     * 2016-11-15 08:07:38.531 bundle.js:911 hello--world*
     * 2016-11-15 08:07:38.531 bundle.js:911 hello-world=3
     * 2016-11-15 08:07:38.531 bundle.js:911 hello-worldworld4
     * 2016-11-15 08:07:38.532 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.532 bundle.js:911 hello-hello=6
     * 2016-11-15 08:07:38.532 bundle.js:911 hello-world=4
     * 2016-11-15 08:07:38.533 bundle.js:911 hello-hello=c
     * 2016-11-15 08:07:38.533 bundle.js:911 hello-==e
     * 2016-11-15 08:07:38.537 bundle.js:911 hello-==f
     * 2016-11-15 08:07:38.537 bundle.js:911 hello-worldworld*
     * 2016-11-15 08:07:38.538 bundle.js:911 hello-hellohello*
     * 2016-11-15 08:07:38.538 bundle.js:911 hello-hello-8
     * 2016-11-15 08:07:38.538 bundle.js:911 hello-world-*
     * 2016-11-15 08:07:38.539 bundle.js:911 hello-hello=9
     * 2016-11-15 08:07:38.539 bundle.js:911 hello-world=a
     * 2016-11-15 08:07:38.540 bundle.js:911 hello-world=f
     * 2016-11-15 08:07:38.540 bundle.js:911 hello-=hello*
     * 2016-11-15 08:07:38.540 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.541 bundle.js:911 hello-world=a
     * 2016-11-15 08:07:38.541 bundle.js:911 hello-helloworld3
     * 2016-11-15 08:07:38.542 bundle.js:911 hello-hellohello*
     * 2016-11-15 08:07:38.542 bundle.js:911 hello---5
     * 2016-11-15 08:07:38.542 bundle.js:911 hello-world=0
     * 2016-11-15 08:07:38.543 bundle.js:911 hello-worldhello2
     * 2016-11-15 08:07:38.543 bundle.js:911 hello---*
     * 2016-11-15 08:07:38.544 bundle.js:911 hello-world-e
     * 2016-11-15 08:07:38.544 bundle.js:911 hello--hello3
     * 2016-11-15 08:07:38.545 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.545 bundle.js:911 hello-world=d
     * 2016-11-15 08:07:38.546 bundle.js:911 hello-world=*
     * 2016-11-15 08:07:38.546 bundle.js:911 hello-worldhelloc
     * 2016-11-15 08:07:38.546 bundle.js:911 hello-world-*
     */
    export class TDevBuildGrammar_02 {
        static kNumCases : number = 1000;

        static kRecursionMax : number = 5;

        static kNumRepeats : number = 10;

        public static TestBuild() {
            let g : fuzztest.generator.rule.grammar.TGrammar;
            let r : fuzztest.generator.rule.rule.TRule;
            let s : fuzztest.generator.rule.sequence.TSequence;
            let c0 : fuzztest.generator.rule.cClass.TCharacterClass;
            let l0 : fuzztest.generator.rule.literal.TLiteral;
            let l1 : fuzztest.generator.rule.literal.TLiteral;
            let l2 : fuzztest.generator.rule.literal.TLiteral;
            let l3 : fuzztest.generator.rule.literal.TLiteral;
            let i : number;
            let x : string;
            fuzztest.generator.TRepository.Clear();
            g = new fuzztest.generator.rule.grammar.TGrammar(new fuzztest.generator.rule._common.TAttributeSet(null, TDevBuildGrammar_02.kRecursionMax, fuzztest.generator.rule._common.ERuleAdhesion.kFollowRule, TDevBuildGrammar_02.kNumRepeats, false));
            r = new fuzztest.generator.rule.rule.TRule(new fuzztest.generator.rule._common.TAttributeSet("start", TDevBuildGrammar_02.kRecursionMax, fuzztest.generator.rule._common.ERuleAdhesion.kFollowRule, TDevBuildGrammar_02.kNumRepeats, false));
            l0 = new fuzztest.generator.rule.literal.TLiteral(new fuzztest.generator.rule._common.TAttributeSet(null, TDevBuildGrammar_02.kRecursionMax, fuzztest.generator.rule._common.ERuleAdhesion.kFollowRule, TDevBuildGrammar_02.kNumRepeats, false));
            l0.SetLiteral("hello");
            l1 = new fuzztest.generator.rule.literal.TLiteral(new fuzztest.generator.rule._common.TAttributeSet(null, TDevBuildGrammar_02.kRecursionMax, fuzztest.generator.rule._common.ERuleAdhesion.kFollowRule, TDevBuildGrammar_02.kNumRepeats, false));
            l1.SetLiteral("-");
            l2 = new fuzztest.generator.rule.literal.TLiteral(new fuzztest.generator.rule._common.TAttributeSet(null, TDevBuildGrammar_02.kRecursionMax, fuzztest.generator.rule._common.ERuleAdhesion.kInjectInvalids, TDevBuildGrammar_02.kNumRepeats, false));
            l2.SetLiteral("world");
            l3 = new fuzztest.generator.rule.literal.TLiteral(new fuzztest.generator.rule._common.TAttributeSet(null, TDevBuildGrammar_02.kRecursionMax, fuzztest.generator.rule._common.ERuleAdhesion.kInjectInvalids, TDevBuildGrammar_02.kNumRepeats, false));
            l3.SetLiteral("=");
            c0 = new fuzztest.generator.rule.cClass.TCharacterClass(new fuzztest.generator.rule._common.TAttributeSet(null, TDevBuildGrammar_02.kRecursionMax, fuzztest.generator.rule._common.ERuleAdhesion.kFollowRule, TDevBuildGrammar_02.kNumRepeats, false));
            c0.AddPoint("*");
            c0.AddRange("0", "9");
            c0.AddRange("a", "f");
            s = new fuzztest.generator.rule.sequence.TSequence(new fuzztest.generator.rule._common.TAttributeSet(null, TDevBuildGrammar_02.kRecursionMax, fuzztest.generator.rule._common.ERuleAdhesion.kFollowRule, TDevBuildGrammar_02.kNumRepeats, false));
            s.Add(l0);
            s.Add(l1);
            s.Add(l2);
            s.Add(l3);
            s.Add(c0);
            r.SetExpression(s);
            g.SetExpression(r);
            console.log();
            console.log("=========================================================");
            console.log("TDevBuildGrammar_02");
            console.log("=========================================================");
            for(i = 0; i < TDevBuildGrammar_02.kNumCases; i++) {
                fuzztest.generator.rule._common.VNode.ClearVisitCounters();
                x = g.CreateData("");
                console.log(x);
            }
        }
    }
    TDevBuildGrammar_02["__classname"] = "fuzztest._dev_concepts.grammar.build.TDevBuildGrammar_02";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.utils.storage {
    /**
     * A poor man's implementation of java.util.ArrayList. I could try and import j4ts, but I got loads of
     * transpilation errors. I have a feeling that writing this impl is getting faster results than
     * trying to make the program work with j4ts.
     * 
     * @author peter
     */
    export class TArrayList<T> {
        private fElements : Array<T>;

        private fNumElements : number;

        public constructor() {
            this.fNumElements = 0;
            this.fElements = <any>(new Array<any>());
            this._Init();
        }

        public Add(obj : T) {
            this.fElements.push(obj);
            this.fNumElements++;
        }

        /**
         * 
         */
        public Clear() {
            this._Init();
        }

        public Get(i : number) : T {
            let ret : T;
            this._AssertIndexOK(i);
            ret = this.fElements[i];
            return ret;
        }

        public GetNumElements() : number {
            return this.fNumElements;
        }

        private _AssertIndexOK(i : number) {
            if(i < 0 || i >= this.fNumElements) {
                throw new RangeError("Index out of bounds. Must be in [0, " + this.fNumElements + "[. Given: " + i);
            }
        }

        private _Init() {
            this.fElements.length = 0;
            this.fNumElements = 0;
        }
    }
    TArrayList["__classname"] = "fuzztest.utils.storage.TArrayList";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.utils.storage {
    /**
     * @author peter
     */
    export class TOnceAssignable<T> {
        private fElement : T;

        public constructor() {
            this.fElement = null;
        }

        public Set(element : T) {
            if(this.fElement != null) {
                throw new java.lang.IllegalArgumentException("Element can only be set once.");
            }
            this.fElement = element;
        }

        public Get() : T {
            if(this.fElement == null) {
                throw new java.lang.IllegalStateException("Cannot retrieve unset element.");
            }
            return this.fElement;
        }
    }
    TOnceAssignable["__classname"] = "fuzztest.utils.storage.TOnceAssignable";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.utils.storage {
    /**
     * A poor man's implementation of java.util.HashMap. I could try and import j4ts, but I got loads of
     * transpilation errors. I have a feeling that writing this impl is getting faster results than
     * trying to make j4ts to work.
     * 
     * @author peter
     */
    export class THashMap<T> {
        private fElements : Object;

        private fNumElements : number;

        public constructor() {
            this.fNumElements = 0;
            this.fElements = <Object>new Object();
            this._Init();
        }

        /**
         * Clears this hashmap. Note that the actual objects won't be deleted,
         * instead we simply set this hash map's elements to <code>null</code>.
         * This means that it's not guaranteed that stored objects will be deleted
         * (e.g. by the garbage collector). Clients should keep access to the
         * stored level as local as possible, e.g. by assigning stored elements to
         * local variables in a function which frees them when function is out of scope.
         */
        public Clear() {
            this._Init();
        }

        public Get(key : string) : T {
            let ret : T;
            this._AssertHasElement(key, false);
            ret = <T>this.fElements[key];
            return ret;
        }

        public GetNumElements() : number {
            return this.fNumElements;
        }

        public HasElement(key : string) : boolean {
            let ret : boolean;
            ret = this.fElements.hasOwnProperty(key);
            return ret;
        }

        public Set(key : string, obj : T) {
            this._AssertHasElement(key, true);
            this.fElements[key] = obj;
            this.fNumElements++;
        }

        private _AssertHasElement(key : string, doInverse : boolean) {
            let hasElement : boolean;
            hasElement = this.fElements.hasOwnProperty(key);
            if(doInverse) {
                if(hasElement) {
                    throw new Error("Duplicate key: \'" + key + "\'");
                }
            } else {
                if(!hasElement) {
                    throw new Error("Unknown key: \'" + key + "\'");
                }
            }
        }

        private _Init() {
            let keys : string[];
            let i : number;
            let n : number;
            let k : string;
            keys = Object.keys(this.fElements);
            n = keys.length;
            if(n >= 1) {
                for(i = 0; i < n; i++) {
                    k = keys[i];
                    this.fElements[k] = null;
                    delete this.fElements[k];
                }
            }
            this.fNumElements = 0;
        }
    }
    THashMap["__classname"] = "fuzztest.utils.storage.THashMap";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.utils.storage {
    /**
     * @author peter
     */
    export class TArrayMap<T> {
        private fArrayList : fuzztest.utils.storage.TArrayList<T>;

        private fHashMap : fuzztest.utils.storage.THashMap<T>;

        public constructor() {
            this.fHashMap = <any>(new fuzztest.utils.storage.THashMap<any>());
            this.fArrayList = <any>(new fuzztest.utils.storage.TArrayList<any>());
        }

        public Add(key : string, obj : T) {
            this.fHashMap.Set(key, obj);
            this.fArrayList.Add(obj);
        }

        /**
         * 
         */
        public Clear() {
            this.fHashMap.Clear();
            this.fArrayList.Clear();
        }

        public Get$int(i : number) : T {
            let ret : T;
            ret = this.fArrayList.Get(i);
            return ret;
        }

        public Get(key? : any) : any {
            if(((typeof key === 'string') || key === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let ret : T;
                    ret = this.fHashMap.Get(key);
                    return ret;
                })();
            } else if(((typeof key === 'number') || key === null)) {
                return <any>this.Get$int(key);
            } else throw new Error('invalid overload');
        }

        public GetNumElements() : number {
            let ret : number;
            ret = this.fArrayList.GetNumElements();
            return ret;
        }

        public HasElement(key : string) : boolean {
            let ret : boolean;
            ret = this.fHashMap.HasElement(key);
            return ret;
        }
    }
    TArrayMap["__classname"] = "fuzztest.utils.storage.TArrayMap";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.utils.gen {
    /**
     * A Mersenne-Twister Random number generator.
     * 
     * @author peter
     */
    export class TRndMT {
        public static kMT : string = "/*\n  I\'ve wrapped Makoto Matsumoto and Takuji Nishimura\'s code in a namespace\n  so it\'s better encapsulated. Now you can have multiple random number generators\n  and they won\'t stomp all over eachother\'s state.\n  \n  If you want to use this as a substitute for Math.random(), use the random()\n  method like so:\n  \n  var m = new MersenneTwister();\n  var randomNumber = m.random();\n  \n  You can also call the other genrand_{foo}() methods on the instance.\n\n  If you want to use a specific seed in order to get a repeatable random\n  sequence, pass an integer into the constructor:\n\n  var m = new MersenneTwister(123);\n\n  and that will always produce the same random sequence.\n\n  Sean McCullough (banksean@gmail.com)\n */\n\n/* \n A C-program for MT19937, with initialization improved 2002/1/26.\n Coded by Takuji Nishimura and Makoto Matsumoto.\n\n Before using, initialize the state by using init_genrand(seed)  \n or init_by_array(init_key, key_length).\n\n Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,\n All rights reserved.                          \n\n Redistribution and use in source and binary forms, with or without\n modification, are permitted provided that the following conditions\n are met:\n\n 1. Redistributions of source code must retain the above copyright\n notice, this list of conditions and the following disclaimer.\n\n 2. Redistributions in binary form must reproduce the above copyright\n notice, this list of conditions and the following disclaimer in the\n documentation and/or other materials provided with the distribution.\n\n 3. The names of its contributors may not be used to endorse or promote \n products derived from this software without specific prior written \n permission.\n\n THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n \"AS IS\" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR\n CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,\n EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,\n PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR\n PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF\n LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING\n NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS\n SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n\n\n Any feedback is very welcome.\n http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html\n email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)\n */\n(\n    function (seed)\n    {\n        var MersenneTwister;\n        var ret;\n        \n        MersenneTwister = function (seed)\n        {\n            if (seed == undefined)\n            {\n                seed = new Date ().getTime ();\n            }\n            /* Period parameters */\n            this.N          = 624;\n            this.M          = 397;\n            this.MATRIX_A   = 0x9908b0df;   /* constant vector a */\n            this.UPPER_MASK = 0x80000000;   /* most significant w-r bits */\n            this.LOWER_MASK = 0x7fffffff;   /* least significant r bits */\n\n            this.mt = new Array (this.N);   /* the array for the state vector */\n            this.mti = this.N + 1;          /* mti==N+1 means mt[N] is not initialized */\n\n            this.init_genrand (seed);\n        }\n\n        /* initializes mt[N] with a seed */\n        MersenneTwister.prototype.init_genrand = function (s)\n        {\n            this.mt[0] = s >>> 0;\n            for (this.mti = 1; this.mti < this.N; this.mti++)\n            {\n                var s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);\n                /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */\n                /* In the previous versions, MSBs of the seed affect */\n                /* only MSBs of the array mt[]. */\n                /* 2002/01/09 modified by Makoto Matsumoto */\n                this.mt[this.mti] = ( ( ( ( (s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253) + this.mti;\n                /* for >32 bit machines */\n                this.mt[this.mti] >>>= 0;\n            }\n        }\n\n        /* initialize by an array with array-length */\n        /* init_key is the array for initializing keys */\n        /* key_length is its length */\n        /* slight change for C++, 2004/2/26 */\n        MersenneTwister.prototype.init_by_array = function (init_key, key_length)\n        {\n            var i, j, k;\n            \n            this.init_genrand (19650218);\n            \n            i = 1;\n            j = 0;\n            k = (this.N > key_length ? this.N : key_length);\n            \n            for (; k; k--)\n            {\n                var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)\n                /* non linear */\n                this.mt[i] = (this.mt[i] ^ ( ( ( ( (s & 0xffff0000) >>> 16) * 1664525) << 16) + ( (s & 0x0000ffff) * 1664525))) + init_key[j] + j;\n                this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */\n                i++;\n                j++;\n                if (i >= this.N)\n                {\n                    this.mt[0] = this.mt[this.N - 1];\n                    i = 1;\n                }\n                if (j >= key_length)\n                    j = 0;\n            }\n            \n            for (k = this.N - 1; k; k--)\n            {\n                var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);\n                /* non linear */\n                this.mt[i] = (this.mt[i] ^ ( ( ( ( (s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941)) - i;\n                this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */\n                i++;\n                if (i >= this.N)\n                {\n                    this.mt[0] = this.mt[this.N - 1];\n                    i = 1;\n                }\n            }\n\n            this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */\n        }\n\n        /* generates a random number on [0,0xffffffff]-interval */\n        MersenneTwister.prototype.genrand_int32 = function ()\n        {\n            var y;\n            var mag01 = new Array (0x0, this.MATRIX_A);\n            /* mag01[x] = x * MATRIX_A for x=0,1 */\n\n            if (this.mti >= this.N)\n            { /* generate N words at one time */\n                var kk;\n\n                if (this.mti == this.N + 1)     /* if init_genrand() has not been called, */\n                    this.init_genrand (5489);   /* a default initial seed is used */\n\n                for (kk = 0; kk < this.N - this.M; kk++)\n                {\n                    y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);\n                    this.mt[kk] = this.mt[kk + this.M] ^ (y >>> 1) ^ mag01[y & 0x1];\n                }\n                for (; kk < this.N - 1; kk++)\n                {\n                    y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);\n                    this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];\n                }\n                y = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK);\n                this.mt[this.N - 1] = this.mt[this.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];\n\n                this.mti = 0;\n            }\n\n            y = this.mt[this.mti++];\n\n            /* Tempering */\n            y ^= (y >>> 11);\n            y ^= (y << 7) & 0x9d2c5680;\n            y ^= (y << 15) & 0xefc60000;\n            y ^= (y >>> 18);\n\n            return y >>> 0;\n        }\n\n        /* generates a random number on [0,0x7fffffff]-interval */\n        MersenneTwister.prototype.genrand_int31 = function ()\n        {\n            return (this.genrand_int32 () >>> 1);\n        }\n\n        /* generates a random number on [0,1]-real-interval */\n        MersenneTwister.prototype.genrand_real1 = function ()\n        {\n            /* divided by 2^32-1 */\n            return this.genrand_int32 () * (1.0 / 4294967295.0);\n        }\n\n        /* generates a random number on [0,1)-real-interval */\n        MersenneTwister.prototype.random = function ()\n        {\n            /* divided by 2^32 */\n            return this.genrand_int32 () * (1.0 / 4294967296.0);\n        }\n\n        /* generates a random number on (0,1)-real-interval */\n        MersenneTwister.prototype.genrand_real3 = function ()\n        {\n            /* divided by 2^32 */\n            return (this.genrand_int32 () + 0.5) * (1.0 / 4294967296.0);\n        }\n\n        /* generates a random number on [0,1) with 53-bit resolution */\n        MersenneTwister.prototype.genrand_res53 = function ()\n        {\n            var a = this.genrand_int32 () >>> 5, b = this.genrand_int32 () >>> 6;\n            return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);\n        }\n        /* These real versions are due to Isaku Wada, 2002/01/09 added */\n\n        ret = new MersenneTwister(seed);\n        \n        return ret;\n    }\n);\n";

        static kDiv : number; public static kDiv_$LI$() : number { if(TRndMT.kDiv == null) TRndMT.kDiv = 1.0 / 4.294967296E9; return TRndMT.kDiv; };

        static kSeed : number = 0.0;

        private fRNDGen : Object;

        private fRNDFuncInt32 : Function;

        public constructor() {
            let rndFactory : Function;
            rndFactory = <Function>eval(TRndMT.kMT);
            this.fRNDGen = <Object>rndFactory.call(rndFactory, TRndMT.kSeed);
            this.fRNDFuncInt32 = <Function>this.fRNDGen["genrand_int32"];
        }

        public GetBoolean() : boolean {
            let x : number;
            let ret : boolean;
            x = this._GetDouble();
            ret = (x >= 0.5);
            return ret;
        }

        /**
         * @param min       The possible minimum
         * @param max       The possible maximum
         * @return          An integer number in the range [min, max].
         */
        public GetIntBetween(min : number, max : number) : number {
            let x : number;
            let xMax : number;
            let ret : number;
            if(min > max) {
                throw new RangeError("Constraints problem. Requirement: min <= max. Given: max:" + max + ", min: " + min);
            }
            if(max > min) {
                xMax = max + 1;
                x = this._GetDouble();
                x = min + x * (xMax - min);
                ret = (<number>Math.floor(x)|0);
            } else {
                ret = min;
            }
            return ret;
        }

        /**
         * @return  A floating point number, in the range: [0, 1[
         */
        public GetDouble() : number {
            let ret : number;
            ret = this._GetDouble();
            return ret;
        }

        /**
         * @return  The next random number, in the range: [0, 1[
         */
        private _GetDouble() : number {
            let x : number;
            let ret : number;
            x = 1;
            while((x >= 1)){
                x = <number>this.fRNDFuncInt32.call(this.fRNDGen);
                x = x * TRndMT.kDiv_$LI$();
            };
            ret = x;
            return ret;
        }
    }
    TRndMT["__classname"] = "fuzztest.utils.gen.TRndMT";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator {
    /**
     * The central repository holding references to all {@link VBrowseable} objects.
     * Implemented as global singleton, i.e. anyone can query the repository for stored
     * objects.
     * Each object is identified by key and by index. Indices are zero based and follow
     * append order, i.e. the object appended first has index zero, next object has index one etc.
     * 
     * @author peter
     */
    export class TRepository {
        /**
         * The repository singleton.
         */
        static gRepository : TRepository; public static gRepository_$LI$() : TRepository { if(TRepository.gRepository == null) TRepository.gRepository = new TRepository(); return TRepository.gRepository; };

        /**
         * Adds an object to the repository. The object must have it's key property set prior to adding.
         * 
         * @param   b                           The object to be stored.
         * @return                              The stored object's key.
         * @throws  IllegalArgumentException    if the object's key isn't set or there's already another object
         * stored with the same key.
         */
        public static Add(b : fuzztest.generator.VBrowseable) : string {
            let ret : string;
            ret = TRepository.gRepository_$LI$()._Add(b);
            return ret;
        }

        public static Clear() {
            TRepository.gRepository_$LI$()._Clear();
        }

        /**
         * Returns the object with the given index.
         * 
         * @param   i   Index of the object requested.
         * @return      Object being requested.
         * @throws  IllegalArgumentException if the index is out of range.
         */
        public static Get$int(i : number) : fuzztest.generator.VBrowseable {
            let ret : fuzztest.generator.VBrowseable;
            ret = TRepository.gRepository_$LI$()._GetElement(i);
            return ret;
        }

        /**
         * Returns the object with the given key.
         * 
         * @param   key     Key of the object requested.
         * @return          Object being requested.
         * @throws  IllegalArgumentException if the key has an invalid value or
         * there isn't any object with that key.
         */
        public static Get(key? : any) : any {
            if(((typeof key === 'string') || key === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let ret : fuzztest.generator.VBrowseable;
                    ret = TRepository.gRepository_$LI$()._GetElement(key);
                    return ret;
                })();
            } else if(((typeof key === 'number') || key === null)) {
                return <any>fuzztest.generator.TRepository.Get$int(key);
            } else throw new Error('invalid overload');
        }

        /**
         * Returns a list of keys of objects that are of the same class as the given {@link VBrowseable}.
         * 
         * @param   b   The {@link VBrowseable} whose class we are querying.
         * @return      A list of keys of objects that are of the given class.
         */
        public static GetKeys$fuzztest_model_abstracts_TClass(c : fuzztest.model.abstracts.TClass) : fuzztest.utils.storage.TArrayList<string> {
            let ret : fuzztest.utils.storage.TArrayList<string>;
            ret = TRepository.gRepository_$LI$()._GetKeys(c, true);
            return ret;
        }

        /**
         * Returns a list of keys of objects that are of the same or parent class as the given {@link VBrowseable}.
         * 
         * @param   b           The {@link VBrowseable} whose class we are querying.
         * @param   isStrict    If <code>true</code>, we filter for objects that have <i>exactly</i>
         * the same class as the given {@link VBrowseable}. If <code>false</code>,
         * we also accept objects of a class that is in the given object's parent
         * chain.
         * @return              A list of keys of objects that are of the given class, or a parent class thereof.
         */
        public static GetKeys(c? : any, isStrict? : any) : any {
            if(((c != null && c instanceof fuzztest.model.abstracts.TClass) || c === null) && ((typeof isStrict === 'boolean') || isStrict === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let ret : fuzztest.utils.storage.TArrayList<string>;
                    ret = TRepository.gRepository_$LI$()._GetKeys(c, isStrict);
                    return ret;
                })();
            } else if(((c != null && c instanceof fuzztest.model.abstracts.TClass) || c === null) && isStrict === undefined) {
                return <any>fuzztest.generator.TRepository.GetKeys$fuzztest_model_abstracts_TClass(c);
            } else throw new Error('invalid overload');
        }

        /**
         * @return  The number of objects stored in the repository.
         */
        public static GetNumElements() : number {
            let ret : number;
            ret = TRepository.gRepository_$LI$()._GetNumElements();
            return ret;
        }

        /**
         * Returns <code>true</code> if there is an object with the given key, <code>false</code> otherwise.
         * 
         * @param   key     The key being queried
         * @return          <code>true</code> if there is an object with the given
         * key, <code>false</code> otherwise.
         */
        public static HasElement(key : string) : boolean {
            let ret : boolean;
            ret = TRepository.gRepository_$LI$()._HasElement(key);
            return ret;
        }

        private fRepository : fuzztest.utils.storage.TArrayMap<fuzztest.generator.VBrowseable>;

        constructor() {
            this.fRepository = <any>(new fuzztest.utils.storage.TArrayMap<any>());
        }

        private _Add(b : fuzztest.generator.VBrowseable) : string {
            let key : string;
            key = b.GetKey();
            this.fRepository.Add(key, b);
            return key;
        }

        /**
         * 
         */
        private _Clear() {
            this.fRepository.Clear();
        }

        private _GetElement$int(i : number) : fuzztest.generator.VBrowseable {
            let ret : fuzztest.generator.VBrowseable;
            ret = this.fRepository.Get(i);
            return ret;
        }

        public _GetElement(key? : any) : any {
            if(((typeof key === 'string') || key === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let ret : fuzztest.generator.VBrowseable;
                    ret = this.fRepository.Get(key);
                    return ret;
                })();
            } else if(((typeof key === 'number') || key === null)) {
                return <any>this._GetElement$int(key);
            } else throw new Error('invalid overload');
        }

        private _GetKeys(c : fuzztest.model.abstracts.TClass, isStrict : boolean) : fuzztest.utils.storage.TArrayList<string> {
            let i : number;
            let n : number;
            let b0 : fuzztest.generator.VBrowseable;
            let c0 : fuzztest.model.abstracts.TClass;
            let isClass : boolean;
            let key : string;
            let ret : fuzztest.utils.storage.TArrayList<string>;
            ret = <any>(new fuzztest.utils.storage.TArrayList<any>());
            n = this.fRepository.GetNumElements();
            if(n >= 1) {
                for(i = 0; i < n; i++) {
                    b0 = this.fRepository.Get(i);
                    c0 = b0.GetClass();
                    if(isStrict) {
                        isClass = c.IsEqualTo(c0);
                    } else {
                        isClass = c.IsEqualToOrDerivedFrom(c0);
                    }
                    if(isClass) {
                        key = b0.GetKey();
                        ret.Add(key);
                    }
                }
            }
            return ret;
        }

        private _GetNumElements() : number {
            let ret : number;
            ret = this.fRepository.GetNumElements();
            return ret;
        }

        private _HasElement(key : string) : boolean {
            let ret : boolean;
            ret = this.fRepository.HasElement(key);
            return ret;
        }
    }
    TRepository["__classname"] = "fuzztest.generator.TRepository";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule._common {
    /**
     * Code generation strategies.
     * 
     * @author peter
     */
    export enum ERuleAdhesion {
        kFollowRule, kInjectInvalids, kFollowOpposite
    }
}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule._common {
    /**
     * @author peter
     */
    export class TAttributeSet {
        public static GetNullSet() : TAttributeSet {
            let ret : TAttributeSet;
            ret = new TAttributeSet(null, 1, null, 0, true);
            return ret;
        }

        public static kRecursionLimit : number = 15;

        public static kRepeatLimit : number = 100;

        public static kReValidKey : RegExp; public static kReValidKey_$LI$() : RegExp { if(TAttributeSet.kReValidKey == null) TAttributeSet.kReValidKey = new RegExp("^[a-zA-Z0-9_]+$"); return TAttributeSet.kReValidKey; };

        private fDoNotRegister : boolean;

        private fKey : string;

        private fRecursionCounter : number;

        private fRecursionMax : number;

        private fRepeatMax : number;

        private fRuleAdhesion : fuzztest.generator.rule._common.ERuleAdhesion;

        public constructor(key : string, recursionMax : number, ruleAdhesion : fuzztest.generator.rule._common.ERuleAdhesion, repeatMax : number, doNotRegister : boolean) {
            this.fDoNotRegister = false;
            this.fRecursionCounter = 0;
            this.fRecursionMax = 0;
            this.fRepeatMax = 0;
            this._AssertParamsOK(key, recursionMax, ruleAdhesion, repeatMax);
            this.fKey = key;
            this.fRecursionMax = recursionMax;
            this.fRuleAdhesion = ruleAdhesion;
            this.fRepeatMax = repeatMax;
            this.fDoNotRegister = doNotRegister;
        }

        /**
         * @return
         */
        public CanEnter() : boolean {
            let ret : boolean;
            ret = (this.fRecursionCounter <= this.fRecursionMax);
            return ret;
        }

        public DoNotRegister() : boolean {
            return this.fDoNotRegister;
        }

        public GetKey() : string {
            return this.fKey;
        }

        public GetNumRepeatsMax() : number {
            return this.fRepeatMax;
        }

        public GetNumVisitsMax() : number {
            return this.fRecursionMax;
        }

        public GetRuleAdhesion() : fuzztest.generator.rule._common.ERuleAdhesion {
            return this.fRuleAdhesion;
        }

        private _AssertParamsOK(key : string, recursionMax : number, ruleAdhesion : fuzztest.generator.rule._common.ERuleAdhesion, repeatMax : number) {
            if(!(TAttributeSet.kReValidKey_$LI$().test(key))) {
                throw new Error("Given key must match: \'" + TAttributeSet.kReValidKey_$LI$() + "\'. Given:" + key);
            }
            if(recursionMax <= 0 || recursionMax > TAttributeSet.kRecursionLimit) {
                throw new RangeError("recursionMax out of range. Allowed: [1, " + TAttributeSet.kRecursionLimit + "], Given:" + recursionMax);
            }
            if(repeatMax < 0 || repeatMax > TAttributeSet.kRepeatLimit) {
                throw new RangeError("repeatMax out of range. Allowed: [0, " + TAttributeSet.kRepeatLimit + "], Given: " + repeatMax);
            }
        }
    }
    TAttributeSet["__classname"] = "fuzztest.generator.rule._common.TAttributeSet";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.cClass {
    /**
     * @author peter
     */
    export abstract class VCharSet {
        public abstract GetChar(s : fuzztest.generator.rule._common.TAttributeSet) : string;
    }
    VCharSet["__classname"] = "fuzztest.generator.rule.cClass.VCharSet";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator {
    /**
     * Browseable object, i.e. can be stored in the {@link TRepository}. Provides
     * manual and automatic key generation.
     * 
     * @author peter
     */
    export abstract class VBrowseable {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(VBrowseable.gkClass == null) VBrowseable.gkClass = (new VBrowseable.VBrowseableT()).GetClass().GetParent(); return VBrowseable.gkClass; };

        static gCounter : number = -1;

        private fClass : fuzztest.model.abstracts.TClass;

        private fKey : string;

        /**
         * cTor.
         */
        constructor() {
            this.fClass = fuzztest.model.abstracts.TClass.Create(this);
            this.fKey = null;
        }

        public GetClass() : fuzztest.model.abstracts.TClass {
            return this.fClass;
        }

        /**
         * @return      The key associated with this object.
         */
        public GetKey() : string {
            return this.fKey;
        }

        /**
         * Assigns an autogenerated key, usually from the cTor of the concrete sub class.
         * Then registers this object with the repository.
         * 
         * @throws IllegalArgumentException if a key has already been assigned before.
         */
        _Register$() {
            this._Register0(null);
        }

        /**
         * Assigns the given key to this object. Key can only be assigned once. Used by rules
         * that have their ID property set in the given grammar.
         * Then registers this object with the repository.
         * 
         * @param   key       The key to be assigned.
         * @throws  IllegalArgumentException if a key has already been assigned.
         */
        public _Register(key? : any) : any {
            if(((typeof key === 'string') || key === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    this._Register0(key);
                })();
            } else if(key === undefined) {
                return <any>this._Register$();
            } else throw new Error('invalid overload');
        }

        _Register0(key : string) {
            let k : string;
            if(this.fKey != null) {
                throw new java.lang.IllegalArgumentException("Key is already assigned.");
            }
            if(key == null) {
                k = this.fClass.GetCanonicalPath();
                VBrowseable.gCounter++;
                this.fKey = k + "_" + VBrowseable.gCounter;
            } else {
                this.fKey = key;
            }
            fuzztest.generator.TRepository.Add(this);
        }
    }
    VBrowseable["__classname"] = "fuzztest.generator.VBrowseable";


    export namespace VBrowseable {

        /**
         * A dummy class to provide a concrete derivative from the hosting abstract class.
         * Purely needed so we have something to instantiate (TClass cTor needs an object).
         */
        export class VBrowseableT extends fuzztest.generator.VBrowseable {        }
        VBrowseableT["__classname"] = "fuzztest.generator.VBrowseable.VBrowseableT";

    }

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.utils.gen {
    /**
     * @author peter
     */
    export class TGenData {
        static gRndGen : fuzztest.utils.gen.TRndMT; public static gRndGen_$LI$() : fuzztest.utils.gen.TRndMT { if(TGenData.gRndGen == null) TGenData.gRndGen = new fuzztest.utils.gen.TRndMT(); return TGenData.gRndGen; };

        constructor() {
        }

        /**
         * @return      A random boolean.
         */
        public static GetBoolean() : boolean {
            let ret : boolean;
            ret = TGenData.gRndGen_$LI$().GetBoolean();
            return ret;
        }

        /**
         * @return      A random character within the full unicode range, [0, 65535].
         */
        public static GetChar$() : string {
            let ret : string;
            ret = String.fromCharCode(TGenData._GetIntBetween(('\u0000').charCodeAt(0), ('\uffff').charCodeAt(0)));
            return ret;
        }

        /**
         * @param   loChar    The lowest possible character.
         * @param   hiChar    The highest possible character.
         * @return            A random character in the range [loChar, hiChar].
         */
        public static GetChar(loChar? : any, hiChar? : any) : any {
            if(((typeof loChar === 'string') || loChar === null) && ((typeof hiChar === 'string') || hiChar === null)) {
                let __args = Array.prototype.slice.call(arguments);
                return <any>(() => {
                    let ret : string;
                    if((loChar).charCodeAt(0) < ('\u0000').charCodeAt(0) || (loChar).charCodeAt(0) > ('\uffff').charCodeAt(0)) {
                        throw new RangeError("Constraints problem: Lower boundery must be in [u0000, uFFFF]. Given: " + (1 * (loChar).charCodeAt(0)));
                    } else if((hiChar).charCodeAt(0) < ('\u0000').charCodeAt(0) || (hiChar).charCodeAt(0) > ('\uffff').charCodeAt(0)) {
                        throw new RangeError("Constraints problem: Upper boundery must be in [u0000, uFFFF]. Given: " + (1 * (hiChar).charCodeAt(0)));
                    } else if((loChar).charCodeAt(0) >= (hiChar).charCodeAt(0)) {
                        throw new RangeError("Constraints problem: Required: loChar < hiChar. Given: loChar: " + (1 * (loChar).charCodeAt(0)) + ", hiChar: " + (1 * (hiChar).charCodeAt(0)));
                    }
                    ret = String.fromCharCode(TGenData._GetIntBetween((loChar).charCodeAt(0), (hiChar).charCodeAt(0)));
                    return ret;
                })();
            } else if(loChar === undefined && hiChar === undefined) {
                return <any>fuzztest.utils.gen.TGenData.GetChar$();
            } else throw new Error('invalid overload');
        }

        /**
         * @return  A random double precision number in the range [0, 1[.
         */
        public static GetDouble() : number {
            let ret : number;
            ret = TGenData.gRndGen_$LI$().GetDouble();
            return ret;
        }

        /**
         * Returns an integer number between <code>0</code> and <code>maxN</code> (exclusive).
         * Convenience method, useful for creating random array indices.
         * 
         * @param       max     Possible maximum less one.
         * @return              Random integer in range [0, maxN[
         */
        public static GetIntUpTo(max : number) : number {
            let xMax : number;
            let ret : number;
            xMax = max - 1;
            ret = TGenData._GetIntBetween(0, xMax);
            return ret;
        }

        /**
         * Returns an integer number between <code>min</code> (inclusive) and <code>max</code> (inclusive).
         * 
         * @param       min     Possible minimum.
         * @param       max     Possible maximum.
         * @return              Random value in range [min, max].
         */
        public static GetIntBetween(min : number, max : number) : number {
            let ret : number;
            ret = TGenData._GetIntBetween(min, max);
            return ret;
        }

        /**
         * Returns an integer number between <code>min</code> (inclusive) and <code>max</code> (inclusive).
         * 
         * @param       min     Possible minimum.
         * @param       max     Possible maximum.
         * @return              Random value in range [min, max].
         */
        private static _GetIntBetween(min : number, max : number) : number {
            let ret : number;
            ret = TGenData.gRndGen_$LI$().GetIntBetween(min, max);
            return ret;
        }
    }
    TGenData["__classname"] = "fuzztest.utils.gen.TGenData";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.cClass {
    /**
     * @author peter
     */
    export class TCharacterRange extends fuzztest.generator.rule.cClass.VCharSet {
        private fHiChar : string;

        private fLoChar : string;

        public constructor(loChar : string, hiChar : string) {
            super();
            this.fHiChar = null;
            this.fLoChar = null;
            this._AssertOk(loChar, hiChar);
            this.fLoChar = loChar.charAt(0);
            this.fHiChar = hiChar.charAt(0);
        }

        public GetChar(s : fuzztest.generator.rule._common.TAttributeSet) : string {
            let doFollow : boolean;
            let doLowerRange : boolean;
            let loChar : string;
            let hiChar : string;
            let ret : string;
            doFollow = fuzztest.generator.rule._common.VNode.DoesFollowRule(s);
            if(doFollow) {
                ret = fuzztest.utils.gen.TGenData.GetChar(this.fLoChar, this.fHiChar);
            } else {
                if(this.fLoChar === '\u0000' && this.fHiChar === '\uffff') {
                    ret = fuzztest.utils.gen.TGenData.GetChar();
                } else if(this.fLoChar === '\u0000') {
                    loChar = String.fromCharCode(((this.fHiChar).charCodeAt(0) + 1));
                    ret = fuzztest.utils.gen.TGenData.GetChar(loChar, '\uffff');
                } else if(this.fHiChar === '\uffff') {
                    hiChar = String.fromCharCode(((this.fLoChar).charCodeAt(0) - 1));
                    ret = fuzztest.utils.gen.TGenData.GetChar('\u0000', hiChar);
                } else {
                    doLowerRange = fuzztest.utils.gen.TGenData.GetBoolean();
                    if(doLowerRange) {
                        hiChar = String.fromCharCode(((this.fLoChar).charCodeAt(0) - 1));
                        ret = fuzztest.utils.gen.TGenData.GetChar('\u0000', hiChar);
                    } else {
                        loChar = String.fromCharCode(((this.fHiChar).charCodeAt(0) + 1));
                        ret = fuzztest.utils.gen.TGenData.GetChar(loChar, '\uffff');
                    }
                }
            }
            return ret;
        }

        /**
         * @param loChar
         * @param hiChar
         */
        private _AssertOk(loChar : string, hiChar : string) {
            let l1 : number;
            let l2 : number;
            let order : number;
            l1 = loChar.length;
            l2 = hiChar.length;
            order = /* compareTo */hiChar.localeCompare(loChar);
            if(l1 !== 1) {
                throw new java.lang.IllegalArgumentException("For loChar: Use string of length 1 (single character string).");
            }
            if(l2 !== 1) {
                throw new java.lang.IllegalArgumentException("For hiChar: Use string of length 1 (single character string).");
            }
            if(order <= 0) {
                throw new java.lang.IllegalArgumentException("loChar must lexically precede hiChar.");
            }
        }
    }
    TCharacterRange["__classname"] = "fuzztest.generator.rule.cClass.TCharacterRange";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.cClass {
    /**
     * @author peter
     */
    export class TCharacterPoint extends fuzztest.generator.rule.cClass.VCharSet {
        private fChar : string;

        public constructor(ch : string) {
            super();
            this.fChar = null;
            this._AssertOK(ch);
            this.fChar = ch.charAt(0);
        }

        public GetChar(s : fuzztest.generator.rule._common.TAttributeSet) : string {
            let doFollow : boolean;
            let doHead : boolean;
            let loChar : string;
            let hiChar : string;
            let ret : string;
            doFollow = fuzztest.generator.rule._common.VNode.DoesFollowRule(s);
            if(doFollow) {
                ret = this.fChar;
            } else {
                if(this.fChar === '\u0000') {
                    loChar = '\u0001';
                    hiChar = '\uffff';
                    ret = fuzztest.utils.gen.TGenData.GetChar(loChar, hiChar);
                } else if(this.fChar === '\uffff') {
                    loChar = '\u0000';
                    hiChar = '\ufffe';
                    ret = fuzztest.utils.gen.TGenData.GetChar(loChar, hiChar);
                } else {
                    doHead = fuzztest.utils.gen.TGenData.GetBoolean();
                    if(doHead) {
                        loChar = '\u0000';
                        hiChar = String.fromCharCode(((this.fChar).charCodeAt(0) - 1));
                        ret = fuzztest.utils.gen.TGenData.GetChar(loChar, hiChar);
                    } else {
                        loChar = String.fromCharCode(((this.fChar).charCodeAt(0) + 1));
                        hiChar = <string>('\uffff');
                        ret = fuzztest.utils.gen.TGenData.GetChar(loChar, hiChar);
                    }
                }
            }
            return ret;
        }

        /**
         * @param ch
         */
        private _AssertOK(ch : string) {
            let l : number;
            l = ch.length;
            if(l !== 1) {
                throw new java.lang.IllegalArgumentException("For ch: Use string of length 1 (single character string).");
            }
        }
    }
    TCharacterPoint["__classname"] = "fuzztest.generator.rule.cClass.TCharacterPoint";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01 {
    /**
     * Concept test: Create object from an abstract class. Only works because it's trans-piled into Javascript,
     * where we (currently) don't have abstract classes.
     * 
     * @author peter
     */
    export class TDevCreateObject_01 {
        public static CreateType() {
            let c : fuzztest.model.abstracts.TClass;
            fuzztest.generator.TRepository.Clear();
            c = (new TDevCreateObject_01.VBrowseableType()).GetClass().GetParent();
            console.log();
            console.log("=========================================================");
            console.log("TDevCreateObject_01");
            console.log("=========================================================");
            console.log("Inheritence chain: " + c.GetInheritPath());
            console.log("Canonical path:    " + c.GetCanonicalPath());
        }
    }
    TDevCreateObject_01["__classname"] = "fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_01";


    export namespace TDevCreateObject_01 {

        export class VBrowseableType extends fuzztest.generator.VBrowseable {        }
        VBrowseableType["__classname"] = "fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_01.VBrowseableType";

    }

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule._common {
    /**
     * @author peter
     */
    export abstract class VNode extends fuzztest.generator.VBrowseable {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(VNode.gkClass == null) VNode.gkClass = (new VNode.VNodeT()).GetClass().GetParent(); return VNode.gkClass; };

        public static ClearVisitCounters() {
            let i : number;
            let n : number;
            let k : string;
            let nd : VNode;
            let clVNode : fuzztest.model.abstracts.TClass;
            let keys : fuzztest.utils.storage.TArrayList<string>;
            clVNode = VNode.gkClass_$LI$();
            keys = fuzztest.generator.TRepository.GetKeys(clVNode, false);
            n = keys.GetNumElements();
            if(n >= 1) {
                for(i = 0; i < n; i++) {
                    k = keys.Get(i);
                    nd = <VNode>fuzztest.generator.TRepository.Get(k);
                    nd.ClearVisitCounter();
                }
            }
        }

        public static DoesFollowRule(s : fuzztest.generator.rule._common.TAttributeSet) : boolean {
            let r : fuzztest.generator.rule._common.ERuleAdhesion;
            let ret : boolean;
            r = s.GetRuleAdhesion();
            if(r === fuzztest.generator.rule._common.ERuleAdhesion.kFollowRule) {
                ret = true;
            } else if(r === fuzztest.generator.rule._common.ERuleAdhesion.kFollowOpposite) {
                ret = false;
            } else {
                ret = fuzztest.utils.gen.TGenData.GetBoolean();
            }
            return ret;
        }

        private fExpression : fuzztest.utils.storage.TOnceAssignable<VNode>;

        private fNumVisits : number;

        private fAttributes : fuzztest.generator.rule._common.TAttributeSet;

        constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super();
            this.fNumVisits = 0;
            this._Init(attributes);
        }

        public ClearVisitCounter() {
            this.fNumVisits = 0;
        }

        /**
         * Creates a data fragment and appends it to the given head string.
         * 
         * This method guards against descend going too deep
         * (recursion limit).
         * 
         * Please call this method from all sub classes as it provides
         * the recursion limit.
         * 
         * @param       s       The fragment creation strategy.
         * @param       head    The head unto which we append the newly
         * created fragment.
         * @return      The newly assembled source code fragment.
         */
        public CreateData(head : string) : string {
            let nVisitsMax : number;
            let ret : string;
            nVisitsMax = this.fAttributes.GetNumVisitsMax();
            if(this.fNumVisits <= nVisitsMax) {
                this.fNumVisits++;
                ret = this._CreateData(head);
            } else {
                ret = head;
            }
            return ret;
        }

        public SetExpression(node : VNode) {
            this.fExpression.Set(node);
        }

        /**
         * Creates a data fragment from the concrete grammar artifact and
         * appends it to the given head string.
         * 
         * This is a default method, meant to be overridden by nodes that generate
         * their own data. Nodes that don't generate data won't need to override
         * this method.
         * 
         * Concrete implementations of this class should not call this
         * method directly, but should call {@link #CreateData(TAttributeSet, String)}.
         * 
         * @param       s       The fragment creation strategy.
         * @return              The data fragment for a particular test case.
         */
        abstract _CreateData(head : string) : string;

        _GetExpression() : VNode {
            let ret : VNode;
            ret = this.fExpression.Get();
            return ret;
        }

        /**
         * Returns either this node or a randomly chosen node different from
         * this one, but of the same (concrete) class (i.e. another object of this class).
         * For example, if this node is a {@linkplain TChoice}, then the chosen
         * node will be a distinctly other {@linkplain TChoice} object.
         * Object will be retrieved from the {@link TRepository}.
         * 
         * The returned node will be used to randomly mix generation rules
         * of the same kind.
         * 
         * @param       s       The generating strategy. If it's
         * {@link TAttributeSet#GetRuleAdhesion()} method
         * returns {@link ERuleAdhesion#kFollowRule} then
         * we will return this node. If the method
         * returns {@link ERuleAdhesion#kInjectInvalids} then
         * we will return a randomly chosen different node.
         * @return              Concrete node of this class, either this one or
         * distinctly different from this node.
         */
        _GetFromOppositeSet() : VNode {
            let c : fuzztest.model.abstracts.TClass;
            let i : number;
            let n : number;
            let kThis : string;
            let kOther : string;
            let hasKey : boolean;
            let isEqual : boolean;
            let refs : fuzztest.utils.storage.TArrayList<string>;
            let ret : VNode;
            kThis = this.GetKey();
            c = this.GetClass();
            refs = fuzztest.generator.TRepository.GetKeys(c);
            n = refs.GetNumElements();
            ret = null;
            if(n >= 2) {
                hasKey = false;
                do {
                    i = fuzztest.utils.gen.TGenData.GetIntUpTo(n);
                    kOther = refs.Get(i);
                    isEqual = (kThis === kOther);
                    hasKey = !isEqual;
                } while((!hasKey));
                ret = <VNode>fuzztest.generator.TRepository.Get(kOther);
            } else {
                ret = <VNode>fuzztest.generator.TRepository.Get(kThis);
            }
            return ret;
        }

        _GetAttributes() : fuzztest.generator.rule._common.TAttributeSet {
            return this.fAttributes;
        }

        _Init(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            let doNotRegister : boolean;
            let key : string;
            this.fAttributes = attributes;
            this.fNumVisits = 0;
            this.fExpression = <any>(new fuzztest.utils.storage.TOnceAssignable<any>());
            doNotRegister = this.fAttributes.DoNotRegister();
            key = this.fAttributes.GetKey();
            if(!doNotRegister) {
                if(key == null) {
                    this._Register();
                } else {
                    this._Register(key);
                }
            }
        }
    }
    VNode["__classname"] = "fuzztest.generator.rule._common.VNode";


    export namespace VNode {

        /**
         * A dummy class to provide a concrete derivative from the hosting abstract class.
         * Purely needed so we have something to instantiate (TClass cTor needs an object).
         */
        export class VNodeT extends fuzztest.generator.rule._common.VNode {
            public constructor() {
                super(fuzztest.generator.rule._common.TAttributeSet.GetNullSet());
            }

            _CreateData(head : string) : string {
                return null;
            }
        }
        VNodeT["__classname"] = "fuzztest.generator.rule._common.VNode.VNodeT";

    }

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01 {
    /**
     * @author peter
     * 
     * Output:
     * 
     * 2016-11-15 08:07:38.358 bundle.js:2251 =========================================================
     * 2016-11-15 08:07:38.358 bundle.js:2252 TDevQueryObject_01
     * 2016-11-15 08:07:38.358 bundle.js:2253 =========================================================
     * 2016-11-15 08:07:38.359 bundle.js:2264 keys-VNode
     * 2016-11-15 08:07:38.359 bundle.js:2265 ---
     * 2016-11-15 08:07:38.361 bundle.js:2270 Node_01
     * 2016-11-15 08:07:38.361 bundle.js:2270 Node_02
     * 2016-11-15 08:07:38.361 bundle.js:2255 ---------------------------------------------------------
     * 2016-11-15 08:07:38.362 bundle.js:2264 keys-VNodeType01
     * 2016-11-15 08:07:38.362 bundle.js:2265 ---
     * 2016-11-15 08:07:38.362 bundle.js:2270 Node_01
     * 2016-11-15 08:07:38.363 bundle.js:2257 ---------------------------------------------------------
     * 2016-11-15 08:07:38.363 bundle.js:2264 keys-VNodeType02
     * 2016-11-15 08:07:38.363 bundle.js:2265 ---
     * 2016-11-15 08:07:38.364 bundle.js:2270 Node_02
     */
    export class TDevQueryObject_01 {
        public static Query() {
            let n1 : TDevQueryObject_01.VNodeType01;
            let n2 : TDevQueryObject_01.VNodeType02;
            let nc0 : fuzztest.model.abstracts.TClass;
            let nc1 : fuzztest.model.abstracts.TClass;
            let nc2 : fuzztest.model.abstracts.TClass;
            let keys0 : fuzztest.utils.storage.TArrayList<string>;
            let keys1 : fuzztest.utils.storage.TArrayList<string>;
            let keys2 : fuzztest.utils.storage.TArrayList<string>;
            fuzztest.generator.TRepository.Clear();
            n1 = new TDevQueryObject_01.VNodeType01();
            n2 = new TDevQueryObject_01.VNodeType02();
            nc0 = fuzztest.generator.rule._common.VNode.gkClass_$LI$();
            nc1 = n1.GetClass();
            nc2 = n2.GetClass();
            keys0 = fuzztest.generator.TRepository.GetKeys(nc0, false);
            keys1 = fuzztest.generator.TRepository.GetKeys(nc1);
            keys2 = fuzztest.generator.TRepository.GetKeys(nc2);
            console.log();
            console.log("=========================================================");
            console.log("TDevQueryObject_01");
            console.log("=========================================================");
            TDevQueryObject_01.DumpKeys("keys-VNode", keys0);
            console.log("---------------------------------------------------------");
            TDevQueryObject_01.DumpKeys("keys-VNodeType01", keys1);
            console.log("---------------------------------------------------------");
            TDevQueryObject_01.DumpKeys("keys-VNodeType02", keys2);
        }

        static DumpKeys(header : string, keys : fuzztest.utils.storage.TArrayList<string>) {
            let i : number;
            let n : number;
            let k : string;
            console.log(header);
            console.log("---");
            n = keys.GetNumElements();
            if(n >= 1) {
                for(i = 0; i < n; i++) {
                    k = keys.Get(i);
                    console.log(k);
                }
            } else {
                console.log("found 0 (zero) keys.");
            }
        }
    }
    TDevQueryObject_01["__classname"] = "fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevQueryObject_01";


    export namespace TDevQueryObject_01 {

        export class VNodeType01 extends fuzztest.generator.rule._common.VNode {
            constructor() {
                super(new fuzztest.generator.rule._common.TAttributeSet("Node_01", 1, fuzztest.generator.rule._common.ERuleAdhesion.kFollowRule, 10, false));
            }

            _CreateData(head : string) : string {
                return null;
            }
        }
        VNodeType01["__classname"] = "fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevQueryObject_01.VNodeType01";


        export class VNodeType02 extends fuzztest.generator.rule._common.VNode {
            constructor() {
                super(new fuzztest.generator.rule._common.TAttributeSet("Node_02", 1, fuzztest.generator.rule._common.ERuleAdhesion.kFollowRule, 10, false));
            }

            _CreateData(head : string) : string {
                return null;
            }
        }
        VNodeType02["__classname"] = "fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevQueryObject_01.VNodeType02";

    }

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01 {
    /**
     * Concept test: Create object from an abstract class. Only works because it's trans-piled into Javascript,
     * where we (currently) don't have abstract classes.
     * 
     * @author peter
     * 
     * Output:
     * 
     * 2016-11-15 07:47:53.489 bundle.js:1838 =========================================================
     * 2016-11-15 07:47:53.490 bundle.js:1839 TDevCreateObject_02
     * 2016-11-15 07:47:53.490 bundle.js:1840 =========================================================
     * 2016-11-15 07:47:53.490 bundle.js:1841 Legend: x'  means "a type derived from x" (as in calculus).
     * 2016-11-15 07:47:53.491 bundle.js:1842       : x'^ means "a parent of a type derived from x" (i.e. x).
     * 2016-11-15 07:47:53.491 bundle.js:1845 VBrowseable       => Inheritence chain: Object.VBrowseable
     * 2016-11-15 07:47:53.492 bundle.js:1846 VBrowseable       => Canonical path:    fuzztest.generator.VBrowseable
     * 2016-11-15 07:47:53.492 bundle.js:1848 VBrowseable'      => Inheritence chain: Object.VBrowseable.VNode
     * 2016-11-15 07:47:53.492 bundle.js:1849 VBrowseable'      => Canonical path:    fuzztest.generator.rule._common.VNode
     * 2016-11-15 07:47:53.493 bundle.js:1851 VBrowseable'      => Inheritence chain: Object.VBrowseable.VDeriv_01
     * 2016-11-15 07:47:53.493 bundle.js:1852 VBrowseable'      => Canonical path:    fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_02.VDeriv_01
     * 2016-11-15 07:47:53.494 bundle.js:1854 VBrowseable''     => Inheritence chain: Object.VBrowseable.VNode.VDeriv_02
     * 2016-11-15 07:47:53.495 bundle.js:1855 VBrowseable''     => Canonical path:    fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_02.VDeriv_02
     * 2016-11-15 07:47:53.495 bundle.js:1857 VBrowseable'^     => Inheritence chain: Object.VBrowseable
     * 2016-11-15 07:47:53.496 bundle.js:1858 VBrowseable'^     => Canonical path:    fuzztest.generator.VBrowseable
     * 2016-11-15 07:47:53.497 bundle.js:1860 VBrowseable''^    => Inheritence chain: Object.VBrowseable.VNode
     * 2016-11-15 07:47:53.497 bundle.js:1861 VBrowseable''^    => Canonical path:    fuzztest.generator.rule._common.VNode
     */
    export class TDevCreateObject_02 {
        public static CreateType() {
            let c : fuzztest.model.abstracts.TClass;
            fuzztest.generator.TRepository.Clear();
            console.log();
            console.log("=========================================================");
            console.log("TDevCreateObject_02");
            console.log("=========================================================");
            console.log("Legend: x\'  means \"a type derived from x\" (as in calculus).");
            console.log("      : x\'^ means \"a parent of a type derived from x\" (i.e. x).");
            console.log();
            c = fuzztest.generator.VBrowseable.gkClass_$LI$();
            console.log("VBrowseable       => Inheritence chain: " + c.GetInheritPath());
            console.log("VBrowseable       => Canonical path:    " + c.GetCanonicalPath());
            c = fuzztest.generator.rule._common.VNode.gkClass_$LI$();
            console.log("VBrowseable\'      => Inheritence chain: " + c.GetInheritPath());
            console.log("VBrowseable\'      => Canonical path:    " + c.GetCanonicalPath());
            c = (new TDevCreateObject_02.VDeriv_01()).GetClass();
            console.log("VBrowseable\'      => Inheritence chain: " + c.GetInheritPath());
            console.log("VBrowseable\'      => Canonical path:    " + c.GetCanonicalPath());
            c = (new TDevCreateObject_02.VDeriv_02()).GetClass();
            console.log("VBrowseable\'\'     => Inheritence chain: " + c.GetInheritPath());
            console.log("VBrowseable\'\'     => Canonical path:    " + c.GetCanonicalPath());
            c = (new TDevCreateObject_02.VDeriv_01()).GetClass().GetParent();
            console.log("VBrowseable\'^     => Inheritence chain: " + c.GetInheritPath());
            console.log("VBrowseable\'^     => Canonical path:    " + c.GetCanonicalPath());
            c = (new TDevCreateObject_02.VDeriv_02()).GetClass().GetParent();
            console.log("VBrowseable\'\'^    => Inheritence chain: " + c.GetInheritPath());
            console.log("VBrowseable\'\'^    => Canonical path:    " + c.GetCanonicalPath());
        }
    }
    TDevCreateObject_02["__classname"] = "fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_02";


    export namespace TDevCreateObject_02 {

        export class VDeriv_01 extends fuzztest.generator.VBrowseable {        }
        VDeriv_01["__classname"] = "fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_02.VDeriv_01";


        export class VDeriv_02 extends fuzztest.generator.rule._common.VNode {
            constructor() {
                super(fuzztest.generator.rule._common.TAttributeSet.GetNullSet());
            }

            _CreateData(head : string) : string {
                return null;
            }
        }
        VDeriv_02["__classname"] = "fuzztest._dev_concepts.objects.construct.from_abstract_class.trial_01.TDevCreateObject_02.VDeriv_02";

    }

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest._dev_concepts.objects.repo.del {
    /**
     * @author peter
     * 
     * Output:
     * 
     * 2016-11-15 07:47:53.498 bundle.js:2010 =========================================================
     * 2016-11-15 07:47:53.498 bundle.js:2011 TDevRepoDel_01::TRepoDelTest_01
     * 2016-11-15 07:47:53.499 bundle.js:2012 =========================================================
     * 2016-11-15 07:47:53.499 bundle.js:2013 object
     */
    export class TDevRepoDel_01 {
        public static TRepoDelTest_01() {
            let n1 : TDevRepoDel_01.VNodeType;
            n1 = new TDevRepoDel_01.VNodeType();
            fuzztest.generator.TRepository.Clear();
            console.log();
            console.log("=========================================================");
            console.log("TDevRepoDel_01::TRepoDelTest_01");
            console.log("=========================================================");
            console.log(typeof n1);
        }
    }
    TDevRepoDel_01["__classname"] = "fuzztest._dev_concepts.objects.repo.del.TDevRepoDel_01";


    export namespace TDevRepoDel_01 {

        export class VNodeType extends fuzztest.generator.rule._common.VNode {
            constructor() {
                super(fuzztest.generator.rule._common.TAttributeSet.GetNullSet());
            }

            _CreateData(head : string) : string {
                return null;
            }
        }
        VNodeType["__classname"] = "fuzztest._dev_concepts.objects.repo.del.TDevRepoDel_01.VNodeType";

    }

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule._common {
    /**
     * @author peter
     */
    export abstract class VNodePassthrough extends fuzztest.generator.rule._common.VNode {
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(VNodePassthrough.gkClass == null) VNodePassthrough.gkClass = new VNodePassthrough.VNodePassthroughT().GetClass().GetParent(); return VNodePassthrough.gkClass; };

        /**
         * @param s
         */
        constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
        }

        _CreateData(head : string) : string {
            let ex : fuzztest.generator.rule._common.VNode;
            let ret : string;
            ex = this._GetExpression();
            ret = ex.CreateData(head);
            return ret;
        }
    }
    VNodePassthrough["__classname"] = "fuzztest.generator.rule._common.VNodePassthrough";


    export namespace VNodePassthrough {

        export class VNodePassthroughT extends fuzztest.generator.rule._common.VNodePassthrough {
            constructor() {
                super(fuzztest.generator.rule._common.TAttributeSet.GetNullSet());
            }
        }
        VNodePassthroughT["__classname"] = "fuzztest.generator.rule._common.VNodePassthrough.VNodePassthroughT";

    }

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule._common {
    /**
     * @author peter
     */
    export abstract class VNodeProcessor extends fuzztest.generator.rule._common.VNode {
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(VNodeProcessor.gkClass == null) VNodeProcessor.gkClass = new VNodeProcessor.VNodeProcessorT().GetClass().GetParent(); return VNodeProcessor.gkClass; };

        /**
         * @param s
         */
        constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
        }
    }
    VNodeProcessor["__classname"] = "fuzztest.generator.rule._common.VNodeProcessor";


    export namespace VNodeProcessor {

        export class VNodeProcessorT extends fuzztest.generator.rule._common.VNodeProcessor {
            constructor() {
                super(fuzztest.generator.rule._common.TAttributeSet.GetNullSet());
            }

            _CreateData(head : string) : string {
                return null;
            }
        }
        VNodeProcessorT["__classname"] = "fuzztest.generator.rule._common.VNodeProcessor.VNodeProcessorT";

    }

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.labelled {
    /**
     * label: expression
     * 
     * Corresponding PEGjs rule:
     * <pre>
     * LabeledExpression
     * = label:Identifier __ ":" __ expression:PrefixedExpression
     * {
     * return
     * {
     * type:               "labeled",
     * label:              label,
     * expression:         expression,
     * location:           location ()
     * };
     * }
     * / PrefixedExpression
     * </pre>
     * 
     * @author peter
     * @see    {@link TText}, {@link TSimpleAnd}, {@link TSimpleNot}
     */
    export class TLabelled extends fuzztest.generator.rule._common.VNodePassthrough {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TLabelled.gkClass == null) TLabelled.gkClass = (new TLabelled(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TLabelled.gkClass; };

        private fLabel : fuzztest.utils.storage.TOnceAssignable<string>;

        public constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
            this.fLabel = <any>(new fuzztest.utils.storage.TOnceAssignable<any>());
        }

        public GetLabel() : string {
            let ret : string;
            ret = this.fLabel.Get();
            return ret;
        }

        public SetLabel(label : string) {
            this.fLabel.Set(label);
        }
    }
    TLabelled["__classname"] = "fuzztest.generator.rule.labelled.TLabelled";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.semanticPredicate.semantic_not {
    /**
     * Semantic NOT.
     * <code>! { predicate }</code>.
     * 
     * From the PEGjs documentation:<br/>
     * <i>The predicate is a piece of JavaScript code that
     * is executed as if it was inside a function. [...]
     * It should return some JavaScript value using the
     * <code>return</code> statement. If the returned value
     * evaluates to <code>false</code> in boolean context,
     * just return <code>undefined</code> and do not advance
     * the parser position; otherwise consider the match failed.</i>
     * 
     * Corresponding PEGjs rule:
     * <pre>
     * SemanticPredicateExpression
     * = operator:SemanticPredicateOperator __ code:CodeBlock
     * {
     * var OPS_TO_SEMANTIC_PREDICATE_TYPES =
     * {
     * "&": "semantic_and",
     * "!": "semantic_not"
     * };
     * 
     * return
     * {
     * type:               OPS_TO_SEMANTIC_PREDICATE_TYPES[operator],
     * code:               code,
     * location:           location ()
     * };
     * }
     * </pre>
     * 
     * @author peter
     * @see    {@link TSemanticAnd}
     */
    export class TSemanticNot extends fuzztest.generator.rule._common.VNodePassthrough {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TSemanticNot.gkClass == null) TSemanticNot.gkClass = (new TSemanticNot(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TSemanticNot.gkClass; };

        /**
         * @param s
         */
        constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
        }
    }
    TSemanticNot["__classname"] = "fuzztest.generator.rule.semanticPredicate.semantic_not.TSemanticNot";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.semanticPredicate.semantic_and {
    /**
     * Semantic AND.
     * <code>& { predicate }</code>.
     * 
     * From the PEGjs documentation:<br/>
     * <i>The predicate is a piece of JavaScript code that
     * is executed as if it was inside a function. [...]
     * It should return some JavaScript value using the
     * <code>return</code> statement. If the returned value
     * evaluates to <code>true</code> in boolean context,
     * just return <code>undefined</code> and do not advance
     * the parser position; otherwise consider the match failed.</i>
     * 
     * Corresponding PEGjs rule:
     * <pre>
     * SemanticPredicateExpression
     * = operator:SemanticPredicateOperator __ code:CodeBlock
     * {
     * var OPS_TO_SEMANTIC_PREDICATE_TYPES =
     * {
     * "&": "semantic_and",
     * "!": "semantic_not"
     * };
     * 
     * return
     * {
     * type:               OPS_TO_SEMANTIC_PREDICATE_TYPES[operator],
     * code:               code,
     * location:           location ()
     * };
     * }
     * </pre>
     * 
     * @author peter
     * @see    {@link TSemanticNot}
     */
    export class TSemanticAnd extends fuzztest.generator.rule._common.VNodePassthrough {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TSemanticAnd.gkClass == null) TSemanticAnd.gkClass = (new TSemanticAnd(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TSemanticAnd.gkClass; };

        /**
         * @param s
         */
        constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
        }
    }
    TSemanticAnd["__classname"] = "fuzztest.generator.rule.semanticPredicate.semantic_and.TSemanticAnd";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.rule_ref {
    /**
     * rule reference.
     * 
     * Corresponding PEGjs rule:
     * <pre>
     * RuleReferenceExpression
     * = name:IdentifierName !(__ (StringLiteral __)? "=")
     * {
     * return
     * {
     * type:               "rule_ref",
     * name:               name,
     * location:           location ()
     * };
     * }
     * </pre>
     * 
     * @author peter
     */
    export class TReference extends fuzztest.generator.rule._common.VNodePassthrough {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TReference.gkClass == null) TReference.gkClass = (new TReference(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TReference.gkClass; };

        /**
         * @param s
         */
        constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
        }
    }
    TReference["__classname"] = "fuzztest.generator.rule.rule_ref.TReference";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.prefixed.simple_not {
    /**
     * 
     * 
     * Corresponding PEGjs rule:
     * 
     * <pre>
     * PrefixedExpression
     * = operator:PrefixedOperator __ expression:SuffixedExpression
     * {
     * var OPS_TO_PREFIXED_TYPES =
     * {
     * "$": "text",
     * "&": "simple_and",
     * "!": "simple_not"
     * };
     * 
     * return
     * {
     * type:               OPS_TO_PREFIXED_TYPES[operator],
     * expression:         expression,
     * location:           location ()
     * };
     * }
     * / SuffixedExpression
     * </pre>
     * 
     * @author peter
     * @see    {@link TSemanticAnd}, {@link TText}
     */
    export class TSimpleNot extends fuzztest.generator.rule._common.VNodePassthrough {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TSimpleNot.gkClass == null) TSimpleNot.gkClass = (new TSimpleNot(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TSimpleNot.gkClass; };

        /**
         * @param s
         */
        constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
        }
    }
    TSimpleNot["__classname"] = "fuzztest.generator.rule.prefixed.simple_not.TSimpleNot";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.prefixed.text {
    /**
     * 
     * 
     * Corresponding PEGjs rule:
     * 
     * <pre>
     * PrefixedExpression
     * = operator:PrefixedOperator __ expression:SuffixedExpression
     * {
     * var OPS_TO_PREFIXED_TYPES =
     * {
     * "$": "text",
     * "&": "simple_and",
     * "!": "simple_not"
     * };
     * 
     * return
     * {
     * type:               OPS_TO_PREFIXED_TYPES[operator],
     * expression:         expression,
     * location:           location ()
     * };
     * }
     * / SuffixedExpression
     * </pre>
     * 
     * $expression
     * 
     * @author peter
     * @see    {@link TSemanticAnd}, {@link TSimpleNot}
     */
    export class TText extends fuzztest.generator.rule._common.VNodePassthrough {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TText.gkClass == null) TText.gkClass = (new TText(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TText.gkClass; };

        /**
         * @param s
         */
        constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
        }
    }
    TText["__classname"] = "fuzztest.generator.rule.prefixed.text.TText";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.prefixed.simple_and {
    /**
     * 
     * 
     * Corresponding PEGjs rule:
     * 
     * <pre>
     * PrefixedExpression
     * = operator:PrefixedOperator __ expression:SuffixedExpression
     * {
     * var OPS_TO_PREFIXED_TYPES =
     * {
     * "$": "text",
     * "&": "simple_and",
     * "!": "simple_not"
     * };
     * 
     * return
     * {
     * type:               OPS_TO_PREFIXED_TYPES[operator],
     * expression:         expression,
     * location:           location ()
     * };
     * }
     * / SuffixedExpression
     * </pre>
     * 
     * @author peter
     */
    export class TSimpleAnd extends fuzztest.generator.rule._common.VNodePassthrough {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TSimpleAnd.gkClass == null) TSimpleAnd.gkClass = (new TSimpleAnd(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TSimpleAnd.gkClass; };

        /**
         * @param s
         */
        constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
        }
    }
    TSimpleAnd["__classname"] = "fuzztest.generator.rule.prefixed.simple_and.TSimpleAnd";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.expression {
    /**
     * Corresponding PEGjs rule:
     * <pre>
     * Expression
     * = ChoiceExpression
     * </pre>
     * @author peter
     */
    export class TExpression extends fuzztest.generator.rule._common.VNodePassthrough {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TExpression.gkClass == null) TExpression.gkClass = (new TExpression(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TExpression.gkClass; };

        /**
         * @param s
         */
        constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
        }
    }
    TExpression["__classname"] = "fuzztest.generator.rule.expression.TExpression";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.initializer {
    /**
     * Corresponding PEGjs rule:
     * <pre>
     * Initializer
     * = code:CodeBlock EOS
     * {
     * return
     * {
     * type:               "initializer",
     * code:               code,
     * location:           location ()
     * };
     * }
     * </pre>
     * @author peter
     */
    export class TInitializer extends fuzztest.generator.rule._common.VNodePassthrough {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TInitializer.gkClass == null) TInitializer.gkClass = (new TInitializer(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TInitializer.gkClass; };

        /**
         * @param s
         */
        constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
        }
    }
    TInitializer["__classname"] = "fuzztest.generator.rule.initializer.TInitializer";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.action {
    /**
     * <pre>
     * ActionExpression
     * = expression:SequenceExpression code:(__ CodeBlock)?
     * {
     * var ret;
     * 
     * if (code !== null)
     * {
     * ret =
     * {
     * type:           "action",
     * expression:     expression,
     * code:           code[1],
     * location:       location ()
     * };
     * }
     * else
     * {
     * ret = expression;
     * }
     * 
     * return ret;
     * }
     * </pre>
     * @author peter
     */
    export class TAction extends fuzztest.generator.rule._common.VNodePassthrough {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TAction.gkClass == null) TAction.gkClass = (new TAction(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TAction.gkClass; };

        /**
         * @param key
         * @param s
         */
        constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
        }
    }
    TAction["__classname"] = "fuzztest.generator.rule.action.TAction";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.named {
    /**
     * 
     * 
     * Corresponding PEGjs rule:
     * 
     * <pre>
     * Rule
     * = name:IdentifierName __ displayName:(StringLiteral __)? "=" __ expression:Expression EOS
     * {
     * var _ex;
     * 
     * if (displayName !== null)
     * {
     * _ex =
     * {
     * type:           "named",
     * name:           displayName[0],
     * expression:     expression,
     * location:       location ()
     * };
     * }
     * else
     * {
     * _ex = expression;
     * }
     * 
     * return
     * {
     * type:               "rule",
     * name:               name,
     * expression:         _ex,
     * location:           location ()
     * };
     * }
     * </pre>
     * 
     * @author peter
     * @see    {@link TRule}
     */
    export class TNamed extends fuzztest.generator.rule._common.VNodePassthrough {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TNamed.gkClass == null) TNamed.gkClass = (new TNamed(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TNamed.gkClass; };

        private fName : fuzztest.utils.storage.TOnceAssignable<string>;

        public constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
            this.fName = <any>(new fuzztest.utils.storage.TOnceAssignable<any>());
        }

        public GetName() : string {
            let ret : string;
            ret = this.fName.Get();
            return ret;
        }

        public SetName(name : string) {
            this.fName.Set(name);
        }
    }
    TNamed["__classname"] = "fuzztest.generator.rule.named.TNamed";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.group {
    /**
     * Corresponding PEGjs rule:
     * <pre>
     * PrimaryExpression
     * = LiteralMatcher
     * / CharacterClassMatcher
     * / AnyMatcher
     * / RuleReferenceExpression
     * / SemanticPredicateExpression
     * / "(" __ expression:Expression __ ")"
     * {
     * var ret;
     * 
     * /
     * * The purpose of the "group" AST node is just to isolate label scope. We
     * * don't need to put it around nodes that can't contain any labels or
     * * nodes that already isolate label scope themselves. This leaves us with
     * * "labeled" and "sequence".
     * /
     * if (expression.type === 'labeled' || expression.type === 'sequence')
     * {
     * ret =
     * {
     * type:           "group",
     * expression:     expression
     * };
     * }
     * else
     * {
     * ret = expression;
     * }
     * 
     * return ret;
     * }
     * </pre>
     * 
     * @author peter
     */
    export class TGroup extends fuzztest.generator.rule._common.VNodePassthrough {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TGroup.gkClass == null) TGroup.gkClass = (new TGroup(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TGroup.gkClass; };

        /**
         * @param s
         */
        constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
        }
    }
    TGroup["__classname"] = "fuzztest.generator.rule.group.TGroup";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.cClass {
    /**
     * A single character generator. Creates characters that (don't) match a given character class.
     * The character class can have multiple character ranges or character points, such as
     * <code>[0-9]</code> or <code>[a-z][0-9]_</code>.
     * 
     * Corresponding PEGjs rules:
     * 
     * <pre>
     * CharacterClassMatcher "character class"
     * = "[" inverted:"^"? parts:(ClassCharacterRange / ClassCharacter)* "]" ignoreCase:"i"?
     * {
     * var _i;
     * var _parts;
     * var _filteredEmptyStrings;
     * 
     * _parts = [];
     * if (parts.length >= 1)
     * {
     * for (i = 0; i < parts.length; i++)
     * {
     * if (parts [i] !== "")
     * {
     * _parts.push (parts[i]);
     * }
     * }
     * }
     * 
     * return
     * {
     * type:               "class",
     * parts:              _parts,
     * inverted:           inverted !== null,
     * ignoreCase:         ignoreCase !== null,
     * location:           location()
     * };
     * }
     * 
     * ClassCharacterRange
     * = begin:ClassCharacter "-" end:ClassCharacter
     * {
     * if (begin.charCodeAt(0) > end.charCodeAt(0))
     * {
     * error ("Invalid character range: " + text() + ".");
     * }
     * 
     * return [begin, end];
     * }
     * 
     * ClassCharacter
     * = !("]" / "\\" / LineTerminator) SourceCharacter
     * {
     * return text ();
     * }
     * / "\\" sequence:EscapeSequence
     * {
     * return sequence;
     * }
     * / LineContinuation
     * </pre>
     * 
     * @author peter
     */
    export class TCharacterClass extends fuzztest.generator.rule._common.VNodeProcessor {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TCharacterClass.gkClass == null) TCharacterClass.gkClass = (new TCharacterClass(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TCharacterClass.gkClass; };

        private fSets : fuzztest.utils.storage.TArrayList<fuzztest.generator.rule.cClass.VCharSet>;

        /**
         * cTor.
         */
        public constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
            this.fSets = <any>(new fuzztest.utils.storage.TArrayList<any>());
        }

        public AddPoint(ch : string) {
            let set : fuzztest.generator.rule.cClass.TCharacterPoint;
            set = new fuzztest.generator.rule.cClass.TCharacterPoint(ch);
            this.fSets.Add(set);
        }

        /**
         * @param string
         * @param string2
         */
        public AddRange(loChar : string, hiChar : string) {
            let set : fuzztest.generator.rule.cClass.TCharacterRange;
            set = new fuzztest.generator.rule.cClass.TCharacterRange(loChar, hiChar);
            this.fSets.Add(set);
        }

        _CreateData(head : string) : string {
            let as : fuzztest.generator.rule._common.TAttributeSet;
            let n : number;
            let cs : fuzztest.generator.rule.cClass.VCharSet;
            let x : number;
            let ret : string;
            n = this.fSets.GetNumElements();
            if(n >= 1) {
                as = this._GetAttributes();
                x = fuzztest.utils.gen.TGenData.GetIntUpTo(n);
                cs = this.fSets.Get(x);
                ret = head + cs.GetChar(as);
            } else {
                ret = head;
            }
            return ret;
        }
    }
    TCharacterClass["__classname"] = "fuzztest.generator.rule.cClass.TCharacterClass";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.sequence {
    /**
     * expression1 expression2 ...
     * 
     * 
     * Corresponding PEGjs rule:
     * 
     * <pre>
     * SequenceExpression
     * = head:LabeledExpression tail:(__ LabeledExpression)*
     * {
     * var _i;
     * var _elements;
     * var ret;
     * 
     * if (tail.length > 0)
     * {
     * _elements      = [];
     * _elements [0]   = head;
     * for (i = 0; i < tail.length; i++)
     * {
     * _elements [i+1] = tail [i][1];
     * }
     * 
     * ret =
     * {
     * type:           "sequence",
     * elements:       _elements,
     * location:       location ()
     * };
     * }
     * else
     * {
     * ret = head;
     * }
     * 
     * return ret;
     * }
     * </pre>
     * 
     * @author peter
     */
    export class TSequence extends fuzztest.generator.rule._common.VNodeProcessor {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TSequence.gkClass == null) TSequence.gkClass = (new TSequence(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TSequence.gkClass; };

        private fElements : fuzztest.utils.storage.TArrayList<fuzztest.generator.rule._common.VNode>;

        public constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
            this.fElements = <any>(new fuzztest.utils.storage.TArrayList<any>());
        }

        public Add(element : fuzztest.generator.rule._common.VNode) {
            this.fElements.Add(element);
        }

        _CreateData(head : string) : string {
            let i : number;
            let n : number;
            let e : fuzztest.generator.rule._common.VNode;
            let ret : string;
            ret = head;
            n = this.fElements.GetNumElements();
            if(n >= 1) {
                for(i = 0; i < n; i++) {
                    e = this.fElements.Get(i);
                    ret = ret + e.CreateData("");
                }
            }
            return ret;
        }
    }
    TSequence["__classname"] = "fuzztest.generator.rule.sequence.TSequence";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.grammar {
    /**
     * Generator rule for: Whole grammar.
     * 
     * Corresponding PEGjs rule:
     * <pre>
     * Grammar
     * = __ initializer:(Initializer __)? rules:(Rule __)+
     * {
     * var _init;
     * var _i;
     * var _extractedRules;
     * 
     * if (initializer)
     * {
     * _init = initializer [0];
     * }
     * else
     * {
     * _init = null;
     * }
     * 
     * _extractedRules = new Array (rules.length);
     * for (_i = 0; _i < rules.length; _i++)
     * {
     * _extractedRules[_i] = rules[_i][0];
     * }
     * 
     * return
     * {
     * type:               "grammar",
     * initializer:        _init,
     * rules:              _extractedRules,
     * location:           location ()
     * };
     * }
     * </pre>
     * 
     * @author peter
     */
    export class TGrammar extends fuzztest.generator.rule._common.VNodeProcessor {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TGrammar.gkClass == null) TGrammar.gkClass = (new TGrammar(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TGrammar.gkClass; };

        static kKeyStart : string = "start";

        /**
         * @param s
         */
        public constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
        }

        _CreateData(head : string) : string {
            let rStart : fuzztest.generator.rule.rule.TRule;
            let ret : string;
            rStart = <fuzztest.generator.rule.rule.TRule>fuzztest.generator.TRepository.Get(TGrammar.kKeyStart);
            ret = rStart.CreateData(head);
            return ret;
        }
    }
    TGrammar["__classname"] = "fuzztest.generator.rule.grammar.TGrammar";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.literal {
    /**
     * 
     * 
     * Corresponding PEGjs rule:
     * 
     * <pre>
     * LiteralMatcher "literal"
     * = value:StringLiteral ignoreCase:"i"?
     * {
     * return
     * {
     * type:               "literal",
     * value:              value,
     * ignoreCase:         ignoreCase !== null,
     * location:           location()
     * };
     * }
     * </pre>
     * 
     * @author peter
     */
    export class TLiteral extends fuzztest.generator.rule._common.VNodeProcessor {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TLiteral.gkClass == null) TLiteral.gkClass = (new TLiteral(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TLiteral.gkClass; };

        private fLiteral : fuzztest.utils.storage.TOnceAssignable<string>;

        /**
         * 
         */
        public constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
            this.fLiteral = <any>(new fuzztest.utils.storage.TOnceAssignable<any>());
        }

        public SetLiteral(literal : string) {
            this.fLiteral.Set(literal);
        }

        _CreateData(head : string) : string {
            let as : fuzztest.generator.rule._common.TAttributeSet;
            let doFollow : boolean;
            let lit : TLiteral;
            let ret : string;
            as = this._GetAttributes();
            doFollow = fuzztest.generator.rule._common.VNode.DoesFollowRule(as);
            if(doFollow) {
                lit = this;
            } else {
                lit = <TLiteral>this._GetFromOppositeSet();
            }
            ret = head + lit.fLiteral.Get();
            return ret;
        }
    }
    TLiteral["__classname"] = "fuzztest.generator.rule.literal.TLiteral";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.choice {
    /**
     * 
     * 
     * Corresponding PEGjs rule:
     * 
     * <pre>
     * ChoiceExpression
     * = head:ActionExpression tail:(__ "/" __ ActionExpression)*
     * {
     * var _alternatives;
     * var _i;
     * var ret;
     * 
     * if (tail.length > 0)
     * {
     * _alternatives      = [];
     * _alternatives [0]  = head;
     * for (i = 0; i < tail.length; i++)
     * {
     * _alternatives [i+1] = tail [i][3];
     * }
     * 
     * ret =
     * {
     * type:           "choice",
     * alternatives:   _alternatives,
     * location:       location ()
     * };
     * }
     * else
     * {
     * ret = head;
     * }
     * 
     * return ret;
     * }
     * </pre>
     * 
     * @author peter
     */
    export class TChoice extends fuzztest.generator.rule._common.VNodeProcessor {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TChoice.gkClass == null) TChoice.gkClass = (new TChoice(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TChoice.gkClass; };

        private fBranches : fuzztest.utils.storage.TArrayList<fuzztest.generator.rule._common.VNode>;

        /**
         * 
         */
        public constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
            this.fBranches = <any>(new fuzztest.utils.storage.TArrayList<any>());
        }

        public AddExpression(node : fuzztest.generator.rule._common.VNode) {
            this.fBranches.Add(node);
        }

        _CreateData(head : string) : string {
            let i : number;
            let n : number;
            let node : fuzztest.generator.rule._common.VNode;
            let ret : string;
            n = this.fBranches.GetNumElements();
            if(n >= 1) {
                i = fuzztest.utils.gen.TGenData.GetIntUpTo(n);
                node = this.fBranches.Get(i);
                ret = node.CreateData(head);
            } else {
                ret = head;
            }
            return ret;
        }
    }
    TChoice["__classname"] = "fuzztest.generator.rule.choice.TChoice";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.rule {
    /**
     * rules = expression
     * 
     * Corresponding PEGjs rule:
     * 
     * <pre>
     * Rule
     * = name:IdentifierName __ displayName:(StringLiteral __)? "=" __ expression:Expression EOS
     * {
     * var _ex;
     * 
     * if (displayName !== null)
     * {
     * _ex =
     * {
     * type:           "named",
     * name:           displayName[0],
     * expression:     expression,
     * location:       location ()
     * };
     * }
     * else
     * {
     * _ex = expression;
     * }
     * 
     * return
     * {
     * type:               "rule",
     * name:               name,
     * expression:         _ex,
     * location:           location ()
     * };
     * }
     * </pre>
     * 
     * @author peter
     * @see    {@link TNamed}
     */
    export class TRule extends fuzztest.generator.rule._common.VNodeProcessor {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TRule.gkClass == null) TRule.gkClass = (new TRule(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TRule.gkClass; };

        public constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
        }

        _CreateData(head : string) : string {
            let as : fuzztest.generator.rule._common.TAttributeSet;
            let doFollow : boolean;
            let ref : TRule;
            let expr : fuzztest.generator.rule._common.VNode;
            let ret : string;
            as = this._GetAttributes();
            doFollow = fuzztest.generator.rule._common.VNode.DoesFollowRule(as);
            if(doFollow) {
                ref = this;
            } else {
                ref = <TRule>this._GetFromOppositeSet();
            }
            expr = ref._GetExpression();
            ret = expr.CreateData(head);
            return ret;
        }
    }
    TRule["__classname"] = "fuzztest.generator.rule.rule.TRule";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.any {
    /**
     * Generator rule for: Any character.
     * 
     * Corresponding PEGjs rule:
     * 
     * <pre>
     * AnyMatcher
     * = "."
     * {
     * return
     * {
     * type:               "any",
     * location:           location()
     * };
     * }
     * </pre>
     * 
     * @author peter
     */
    export class TAny extends fuzztest.generator.rule._common.VNodeProcessor {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TAny.gkClass == null) TAny.gkClass = (new TAny(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TAny.gkClass; };

        /**
         * @param attributes
         */
        constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
        }

        _CreateData(head : string) : string {
            let ret : string;
            ret = head + fuzztest.utils.gen.TGenData.GetChar();
            return ret;
        }
    }
    TAny["__classname"] = "fuzztest.generator.rule.any.TAny";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.suffixed {
    /**
     * @author peter
     */
    export abstract class VSuffixed extends fuzztest.generator.rule._common.VNodeProcessor {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(VSuffixed.gkClass == null) VSuffixed.gkClass = (new VSuffixed.VSuffixedT()).GetClass().GetParent(); return VSuffixed.gkClass; };

        private fIsNMinZero : boolean;

        private fIsNMaxInfinite : boolean;

        /**
         * cTor. Creates a new suffixed expression. One of x? (optional), x+ (one-or-more), x* (zero-or-more).
         * The two parameters reflect the actual behavior of the created object:
         * 
         * <code>isNMinZero</code>: <code>true</code>, <code>isNMaxInfinite</code>:  <code>false</code>: <code>x?</code>
         * <code>isNMinZero</code>: <code>false</code>, <code>isNMaxInfinite</code>: <code>true</code>:  <code>x+</code>
         * <code>isNMinZero</code>: <code>true</code>, <code>isNMaxInfinite</code>:  <code>true</code>:  <code>x*</code>
         * 
         * @param isNMinZero            Allow minimum of zero characters?
         * @param isNMaxInfinite        Allow for infinite number of characters?
         */
        constructor(isNMinZero : boolean, isNMaxInfinite : boolean, attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(attributes);
            this.fIsNMinZero = false;
            this.fIsNMaxInfinite = false;
            this.fIsNMinZero = isNMinZero;
            this.fIsNMaxInfinite = isNMaxInfinite;
        }

        _CreateData(head : string) : string {
            let as : fuzztest.generator.rule._common.TAttributeSet;
            let r : fuzztest.generator.rule._common.ERuleAdhesion;
            let ex : fuzztest.generator.rule._common.VNode;
            let doBreakRule : boolean;
            let nMin : number;
            let nMax : number;
            let n : number;
            let i : number;
            let ret : string;
            as = this._GetAttributes();
            doBreakRule = true;
            r = as.GetRuleAdhesion();
            if(r === fuzztest.generator.rule._common.ERuleAdhesion.kFollowRule) {
                doBreakRule = false;
            } else {
                doBreakRule = fuzztest.utils.gen.TGenData.GetBoolean();
            }
            n = 0;
            if(doBreakRule) {
                nMin = 0;
                nMax = 0;
                if(this.fIsNMinZero && !this.fIsNMaxInfinite) {
                    nMax = 1;
                } else if(!this.fIsNMinZero && this.fIsNMaxInfinite) {
                    nMax = 0;
                } else if(this.fIsNMinZero && this.fIsNMaxInfinite) {
                    nMax = as.GetNumRepeatsMax();
                }
                if(nMax >= 1) {
                    n = fuzztest.utils.gen.TGenData.GetIntBetween(nMin, nMax);
                }
            } else {
                nMin = this.fIsNMinZero?0:1;
                nMax = this.fIsNMaxInfinite?as.GetNumRepeatsMax():1;
                n = fuzztest.utils.gen.TGenData.GetIntBetween(nMin, nMax);
            }
            ret = head;
            if(n >= 1) {
                ex = this._GetExpression();
                for(i = 1; i <= n; i++) {
                    ret = ret + ex.CreateData("");
                }
            }
            return ret;
        }
    }
    VSuffixed["__classname"] = "fuzztest.generator.rule.suffixed.VSuffixed";


    export namespace VSuffixed {

        /**
         * A dummy class to provide a concrete derivative from the hosting abstract class.
         * Purely needed so we have something to instantiate (TClass cTor needs an object).
         */
        export class VSuffixedT extends fuzztest.generator.rule.suffixed.VSuffixed {
            constructor() {
                super(false, false, fuzztest.generator.rule._common.TAttributeSet.GetNullSet());
            }
        }
        VSuffixedT["__classname"] = "fuzztest.generator.rule.suffixed.VSuffixed.VSuffixedT";

    }

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.suffixed.one_or_more {
    /**
     * SuffixedExpression
     * = expression:PrimaryExpression __ operator:SuffixedOperator
     * {
     * var OPS_TO_SUFFIXED_TYPES =
     * {
     * "?": "optional",
     * "*": "zero_or_more",
     * "+": "one_or_more"
     * };
     * 
     * return
     * {
     * type:               OPS_TO_SUFFIXED_TYPES[operator],
     * expression:         expression,
     * location:           location ()
     * };
     * }
     * / PrimaryExpression
     * 
     * @author peter
     * @see    {@link TZeroOrMore}, {@link TOptional}
     */
    export class TOneOrMore extends fuzztest.generator.rule.suffixed.VSuffixed {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TOneOrMore.gkClass == null) TOneOrMore.gkClass = (new TOneOrMore(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TOneOrMore.gkClass; };

        public constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(false, true, attributes);
        }
    }
    TOneOrMore["__classname"] = "fuzztest.generator.rule.suffixed.one_or_more.TOneOrMore";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.suffixed.optional {
    /**
     * 
     * Corresponding PEGjs rule:
     * 
     * <pre>
     * SuffixedExpression
     * = expression:PrimaryExpression __ operator:SuffixedOperator
     * {
     * var OPS_TO_SUFFIXED_TYPES =
     * {
     * "?": "optional",
     * "*": "zero_or_more",
     * "+": "one_or_more"
     * };
     * 
     * return
     * {
     * type:               OPS_TO_SUFFIXED_TYPES[operator],
     * expression:         expression,
     * location:           location ()
     * };
     * }
     * / PrimaryExpression
     * </pre>
     * 
     * @author peter
     * @see    {@link TZeroOrMore}, {@link TOneOrMore}
     */
    export class TOptional extends fuzztest.generator.rule.suffixed.VSuffixed {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TOptional.gkClass == null) TOptional.gkClass = (new TOptional(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TOptional.gkClass; };

        public constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(true, false, attributes);
        }
    }
    TOptional["__classname"] = "fuzztest.generator.rule.suffixed.optional.TOptional";

}
/* Generated from Java with JSweet 1.2.0-SNAPSHOT - http://www.jsweet.org */
namespace fuzztest.generator.rule.suffixed.zero_or_more {
    /**
     * 
     * 
     * Corresponding PEGjs rule:
     * 
     * <pre>
     * SuffixedExpression
     * = expression:PrimaryExpression __ operator:SuffixedOperator
     * {
     * var OPS_TO_SUFFIXED_TYPES =
     * {
     * "?": "optional",
     * "*": "zero_or_more",
     * "+": "one_or_more"
     * };
     * 
     * return
     * {
     * type:               OPS_TO_SUFFIXED_TYPES[operator],
     * expression:         expression,
     * location:           location ()
     * };
     * }
     * / PrimaryExpression
     * </pre>
     * 
     * @author peter
     * @see    {@link TOptional}, {@link TOneOrMore}
     */
    export class TZeroOrMore extends fuzztest.generator.rule.suffixed.VSuffixed {
        /**
         * The {@link TClass} of this class for type information.
         */
        public static gkClass : fuzztest.model.abstracts.TClass; public static gkClass_$LI$() : fuzztest.model.abstracts.TClass { if(TZeroOrMore.gkClass == null) TZeroOrMore.gkClass = (new TZeroOrMore(fuzztest.generator.rule._common.TAttributeSet.GetNullSet())).GetClass(); return TZeroOrMore.gkClass; };

        public constructor(attributes : fuzztest.generator.rule._common.TAttributeSet) {
            super(true, true, attributes);
        }
    }
    TZeroOrMore["__classname"] = "fuzztest.generator.rule.suffixed.zero_or_more.TZeroOrMore";

}


fuzztest.generator.rule.suffixed.zero_or_more.TZeroOrMore.gkClass_$LI$();

fuzztest.generator.rule.suffixed.optional.TOptional.gkClass_$LI$();

fuzztest.generator.rule.suffixed.one_or_more.TOneOrMore.gkClass_$LI$();

fuzztest.generator.rule.suffixed.VSuffixed.gkClass_$LI$();

fuzztest.generator.rule.any.TAny.gkClass_$LI$();

fuzztest.generator.rule.rule.TRule.gkClass_$LI$();

fuzztest.generator.rule.choice.TChoice.gkClass_$LI$();

fuzztest.generator.rule.literal.TLiteral.gkClass_$LI$();

fuzztest.generator.rule.grammar.TGrammar.gkClass_$LI$();

fuzztest.generator.rule.sequence.TSequence.gkClass_$LI$();

fuzztest.generator.rule.cClass.TCharacterClass.gkClass_$LI$();

fuzztest.generator.rule.group.TGroup.gkClass_$LI$();

fuzztest.generator.rule.named.TNamed.gkClass_$LI$();

fuzztest.generator.rule.action.TAction.gkClass_$LI$();

fuzztest.generator.rule.initializer.TInitializer.gkClass_$LI$();

fuzztest.generator.rule.expression.TExpression.gkClass_$LI$();

fuzztest.generator.rule.prefixed.simple_and.TSimpleAnd.gkClass_$LI$();

fuzztest.generator.rule.prefixed.text.TText.gkClass_$LI$();

fuzztest.generator.rule.prefixed.simple_not.TSimpleNot.gkClass_$LI$();

fuzztest.generator.rule.rule_ref.TReference.gkClass_$LI$();

fuzztest.generator.rule.semanticPredicate.semantic_and.TSemanticAnd.gkClass_$LI$();

fuzztest.generator.rule.semanticPredicate.semantic_not.TSemanticNot.gkClass_$LI$();

fuzztest.generator.rule.labelled.TLabelled.gkClass_$LI$();

fuzztest.generator.rule._common.VNodeProcessor.gkClass_$LI$();

fuzztest.generator.rule._common.VNodePassthrough.gkClass_$LI$();

fuzztest.generator.rule._common.VNode.gkClass_$LI$();

fuzztest.utils.gen.TGenData.gRndGen_$LI$();

fuzztest.generator.VBrowseable.gkClass_$LI$();

fuzztest.generator.rule._common.TAttributeSet.kReValidKey_$LI$();

fuzztest.generator.TRepository.gRepository_$LI$();

fuzztest.utils.gen.TRndMT.kDiv_$LI$();

fuzztest.TMain.main(null);
