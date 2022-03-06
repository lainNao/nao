//[[1,2], [a,b,c]]などを入れると、[[1,2], [a,b,c,a,b,c]]を返す。
//つまり前の前の要素数分、今の要素を繰り返して返す。
//こうすることでグリッドの行や列のタイトルの組み合わせセルを作れる。
export const graduallyMultiplyArrays = (arrays: any[][]): any[][] => {
  return arrays.reduce((prevVal: any, val, i) => {
    prevVal.push(
      new Array(prevVal[i - 1] ? prevVal[i - 1].length : 1).fill(val).flat()
    );
    return prevVal;
  }, []);
};

//graduallyMultiplyArraysは[[1,2], [a,b,c]]などを入れると[[1,2], [a,b,c,a,b,c]]を返すけど、
//targetValuesに[2,b]を入れると5を返す。
//こうすることでMultiply的なタイトルの作り方するグリッドの実際のx軸またはy軸の番地を出せる
export const getMultipliedIndex = (
  arrays: any[],
  targetValues: any[]
): number => {
  const multipliedFullLength = arrays.reduce((prev, now) => {
    return prev === 0 ? now.length : prev * now.length;
  }, 0);

  const targetIndex = arrays.reduce(
    (prev, now, i) => {
      const currentArrLength = now.length ?? 1;
      const currentArrIndex = now.indexOf(targetValues[i]);
      const remainedAmount = prev.remainedAmount / currentArrLength;
      const targetIndex = prev.targetIndex + remainedAmount * currentArrIndex;
      return {
        targetIndex,
        remainedAmount,
      };
    },
    {
      targetIndex: 0,
      remainedAmount: multipliedFullLength,
    }
  ).targetIndex;

  return targetIndex;
};
