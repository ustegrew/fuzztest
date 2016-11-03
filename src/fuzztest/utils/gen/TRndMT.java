/* -----------------------------------------------------------------------------
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
----------------------------------------------------------------------------- */

package fuzztest.utils.gen;

import static jsweet.lang.Globals.eval;

import jsweet.dom.Globals;

/**
 * A Mersenne-Twister Random number generator.
 * 
 * @author peter
 *
 */
public class TRndMT
{
    public static final String kMT =
        "/*\n" + 
        "  I've wrapped Makoto Matsumoto and Takuji Nishimura's code in a namespace\n" + 
        "  so it's better encapsulated. Now you can have multiple random number generators\n" + 
        "  and they won't stomp all over eachother's state.\n" + 
        "  \n" + 
        "  If you want to use this as a substitute for Math.random(), use the random()\n" + 
        "  method like so:\n" + 
        "  \n" + 
        "  var m = new MersenneTwister();\n" + 
        "  var randomNumber = m.random();\n" + 
        "  \n" + 
        "  You can also call the other genrand_{foo}() methods on the instance.\n" + 
        "\n" + 
        "  If you want to use a specific seed in order to get a repeatable random\n" + 
        "  sequence, pass an integer into the constructor:\n" + 
        "\n" + 
        "  var m = new MersenneTwister(123);\n" + 
        "\n" + 
        "  and that will alwaFunctionys produce the same random sequence.\n" + 
        "\n" + 
        "  Sean McCullough (banksean@gmail.com)\n" + 
        "*/\n" + 
        "\n" + 
        "/* \n" + 
        "   A C-program for MT19937, with initialization improved 2002/1/26.\n" + 
        "   Coded by Takuji Nishimura and Makoto Matsumoto.\n" + 
        " \n" + 
        "   Before using, initialize the state by using init_genrand(seed)  \n" + 
        "   or init_by_array(init_key, key_length).\n" + 
        " \n" + 
        "   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,\n" + 
        "   All rights reserved.                          \n" + 
        " \n" + 
        "   Redistribution and use in source and binary forms, with or without\n" + 
        "   modification, are permitted provided that the following conditions\n" + 
        "   are met:\n" + 
        " \n" + 
        "     1. Redistributions of source code must retain the above copyright\n" + 
        "        notice, this list of conditions and the following disclaimer.\n" + 
        " \n" + 
        "     2. Redistributions in binary form must reproduce the above copyright\n" + 
        "        notice, this list of conditions and the following disclaimer in the\n" + 
        "        documentation and/or other materials provided with the distribution.\n" + 
        " \n" + 
        "     3. The names of its contributors may not be used to endorse or promote \n" + 
        "        products derived from this software without specific prior written \n" + 
        "        permission.\n" + 
        " \n" + 
        "   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n" + 
        "   \"AS IS\" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\n" + 
        "   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\n" + 
        "   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR\n" + 
        "   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,\n" + 
        "   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,\n" + 
        "   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR\n" + 
        "   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF\n" + 
        "   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING\n" + 
        "   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS\n" + 
        "   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n" + 
        " \n" + 
        " \n" + 
        "   Any feedback is very welcome.\n" + 
        "   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html\n" + 
        "   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)\n" + 
        "*/\n" + 
        "\n" + 
        "window.MersenneTwister = function(seed) {\n" + 
        "  if (seed == undefined) {\n" + 
        "    seed = new Date().getTime();\n" + 
        "  } \n" + 
        "  /* Period parameters */  \n" + 
        "  this.N = 624;\n" + 
        "  this.M = 397;\n" + 
        "  this.MATRIX_A = 0x9908b0df;   /* constant vector a */\n" + 
        "  this.UPPER_MASK = 0x80000000; /* most significant w-r bits */\n" + 
        "  this.LOWER_MASK = 0x7fffffff; /* least significant r bits */\n" + 
        " \n" + 
        "  this.mt = new Array(this.N); /* the array for the state vector */\n" + 
        "  this.mti=this.N+1; /* mti==N+1 means mt[N] is not initialized */\n" + 
        "\n" + 
        "  this.init_genrand(seed);\n" + 
        "}  \n" + 
        " \n" + 
        "/* initializes mt[N] with a seed */\n" + 
        "window.MersenneTwister.prototype.init_genrand = function(s) {\n" + 
        "  this.mt[0] = s >>> 0;\n" + 
        "  for (this.mti=1; this.mti<this.N; this.mti++) {\n" + 
        "      var s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);\n" + 
        "   this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253)\n" + 
        "  + this.mti;\n" + 
        "      /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */\n" + 
        "      /* In the previous versions, MSBs of the seed affect   */\n" + 
        "      /* only MSBs of the array mt[].                        */\n" + 
        "      /* 2002/01/09 modified by Makoto Matsumoto             */\n" + 
        "      this.mt[this.mti] >>>= 0;\n" + 
        "      /* for >32 bit machines */\n" + 
        "  }\n" + 
        "}\n" + 
        " \n" + 
        "/* initialize by an array with array-length */\n" + 
        "/* init_key is the array for initializing keys */\n" + 
        "/* key_length is its length */\n" + 
        "/* slight change for C++, 2004/2/26 */\n" + 
        "window.MersenneTwister.prototype.init_by_array = function(init_key, key_length) {\n" + 
        "  var i, j, k;\n" + 
        "  this.init_genrand(19650218);\n" + 
        "  i=1; j=0;\n" + 
        "  k = (this.N>key_length ? this.N : key_length);\n" + 
        "  for (; k; k--) {\n" + 
        "    var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30)\n" + 
        "    this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1664525) << 16) + ((s & 0x0000ffff) * 1664525)))\n" + 
        "      + init_key[j] + j; /* non linear */\n" + 
        "    this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */\n" + 
        "    i++; j++;\n" + 
        "    if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }\n" + 
        "    if (j>=key_length) j=0;\n" + 
        "  }\n" + 
        "  for (k=this.N-1; k; k--) {\n" + 
        "    var s = this.mt[i-1] ^ (this.mt[i-1] >>> 30);\n" + 
        "    this.mt[i] = (this.mt[i] ^ (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) + (s & 0x0000ffff) * 1566083941))\n" + 
        "      - i; /* non linear */\n" + 
        "    this.mt[i] >>>= 0; /* for WORDSIZE > 32 machines */\n" + 
        "    i++;\n" + 
        "    if (i>=this.N) { this.mt[0] = this.mt[this.N-1]; i=1; }\n" + 
        "  }\n" + 
        "\n" + 
        "  this.mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */ \n" + 
        "}\n" + 
        " \n" + 
        "/* generates a random number on [0,0xffffffff]-interval */\n" + 
        "window.MersenneTwister.prototype.genrand_int32 = function() {\n" + 
        "  var y;\n" + 
        "  var mag01 = new Array(0x0, this.MATRIX_A);\n" + 
        "  /* mag01[x] = x * MATRIX_A  for x=0,1 */\n" + 
        "\n" + 
        "  if (this.mti >= this.N) { /* generate N words at one time */\n" + 
        "    var kk;\n" + 
        "\n" + 
        "    if (this.mti == this.N+1)   /* if init_genrand() has not been called, */\n" + 
        "      this.init_genrand(5489); /* a default initial seed is used */\n" + 
        "\n" + 
        "    for (kk=0;kk<this.N-this.M;kk++) {\n" + 
        "      y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);\n" + 
        "      this.mt[kk] = this.mt[kk+this.M] ^ (y >>> 1) ^ mag01[y & 0x1];\n" + 
        "    }\n" + 
        "    for (;kk<this.N-1;kk++) {\n" + 
        "      y = (this.mt[kk]&this.UPPER_MASK)|(this.mt[kk+1]&this.LOWER_MASK);\n" + 
        "      this.mt[kk] = this.mt[kk+(this.M-this.N)] ^ (y >>> 1) ^ mag01[y & 0x1];\n" + 
        "    }\n" + 
        "    y = (this.mt[this.N-1]&this.UPPER_MASK)|(this.mt[0]&this.LOWER_MASK);\n" + 
        "    this.mt[this.N-1] = this.mt[this.M-1] ^ (y >>> 1) ^ mag01[y & 0x1];\n" + 
        "\n" + 
        "    this.mti = 0;\n" + 
        "  }\n" + 
        "\n" + 
        "  y = this.mt[this.mti++];\n" + 
        "\n" + 
        "  /* Tempering */\n" + 
        "  y ^= (y >>> 11);\n" + 
        "  y ^= (y << 7) & 0x9d2c5680;\n" + 
        "  y ^= (y << 15) & 0xefc60000;\n" + 
        "  y ^= (y >>> 18);\n" + 
        "\n" + 
        "  return y >>> 0;\n" + 
        "}\n" + 
        " \n" + 
        "/* generates a random number on [0,0x7fffffff]-interval */\n" + 
        "window.MersenneTwister.prototype.genrand_int31 = function() {\n" + 
        "  return (this.genrand_int32()>>>1);\n" + 
        "}\n" + 
        " \n" + 
        "/* generates a random number on [0,1]-real-interval */\n" + 
        "window.MersenneTwister.prototype.genrand_real1 = function() {\n" + 
        "  return this.genrand_int32()*(1.0/4294967295.0); \n" + 
        "  /* divided by 2^32-1 */ \n" + 
        "}\n" + 
        "\n" + 
        "/* generates a random number on [0,1)-real-interval */\n" + 
        "window.MersenneTwister.prototype.random = function() {\n" + 
        "  return this.genrand_int32()*(1.0/4294967296.0); \n" + 
        "  /* divided by 2^32 */\n" + 
        "}\n" + 
        " \n" + 
        "/* generates a random number on (0,1)-real-interval */\n" + 
        "window.MersenneTwister.prototype.genrand_real3 = function() {\n" + 
        "  return (this.genrand_int32() + 0.5)*(1.0/4294967296.0); \n" + 
        "  /* divided by 2^32 */\n" + 
        "}\n" + 
        " \n" + 
        "/* generates a random number on [0,1) with 53-bit resolution*/\n" + 
        "window.MersenneTwister.prototype.genrand_res53 = function() { \n" + 
        "  var a=this.genrand_int32()>>>5, b=this.genrand_int32()>>>6; \n" + 
        "  return(a*67108864.0+b)*(1.0/9007199254740992.0); \n" + 
        "} \n" + 
        "\n" + 
        "window.MersenneTwisterGen = new window.MersenneTwister(0);\n" +
        "/* These real versions are due to Isaku Wada, 2002/01/09 added */\n"; 

    private jsweet.lang.Object      fRNDGen;
    private jsweet.lang.Function    fRNDFunc;
    
    public TRndMT ()
    {
        eval (kMT);     /* [100] */
        
        fRNDGen     = (jsweet.lang.Object) Globals.window.$get ("MersenneTwisterGen");
        fRNDFunc    = (jsweet.lang.Function) fRNDGen.$get ("random");
    }
    
    /**
     * @return  The next random number, in the range: [0, 1[
     */
    public double GetDouble ()
    {
        double      ret;
        
        ret = 0;
        while (ret < 1)
        {
            ret = (double) fRNDFunc.call (fRNDGen); 
        }
        
        return ret;
    }
}

/*
[100] Daft way of initializing - I'm sure there are more elegant ways than eval'ing a String.
      But it works for now, and we have a good random number generator. 
*/