import React from 'react';
import moment from 'moment';

// 获取真实对象类型
const typeOf = o => Object.prototype.toString.call(o).match(/\[object (.*?)\]/)[1].toLowerCase();

const getRandomBetweenMaxAndMin = (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min;
// 判断字符串是否为json格式,是则返回parse后结果，否则返回false
const checkJSONString = (str) => {
  let res = true;
  try {
    res = JSON.parse(str);
    if (typeOf(res) !== 'object' && typeOf(res) !== 'array') {
      res = false;
    }
  } catch (e) {
    res = false;
  }
  return res;
};
// json格式化高亮显示
const getJsonReactNode = (obj, needComma, styles) => {
  const style = styles || {};
  const outerType = typeOf(obj);
  const l = '[';
  const r = ']';
  if (outerType === 'array') {
    return (
      <span>
        <span style={{ fontWeight: 'bold' }}>{l}</span>
        <div>
          <div style={{ paddingLeft: 24 }}>
            {
              obj.map((item, index) => {
                return (
                  <div key={index}>
                    {
                      getJsonReactNode(item, true, style)
                    }
                  </div>
                );
              })
            }
          </div>
          <span style={{ fontWeight: 'bold' }}>{r}</span>
          { needComma ? ',' : '' }
        </div>
      </span>
    );
  } else if (outerType === 'object') {
    const keys = Object.keys(obj);
    if (keys.length > 0) {
      const kvArray = keys.map((item, index) => {
        const comma = index === keys.length - 1 ? '' : ',';
        const value = obj[item];
        const type = typeOf(value);
        const handleValue = () => {
          switch (type) {
            case 'object':
              return getJsonReactNode(value, comma, style);
            case 'number': {
              const lowerItem = item.toLowerCase();
              if ((lowerItem.includes('time') || lowerItem.includes('date')) && value >= 0) {
                return (
                  <span
                    title={`日期？ ${moment(value).format('YYYY-MM-DD HH:mm:ss')}`}
                    style={{ color: style.numberColor || '#1A01CC', fontWeight: 'bold' }}
                  >
                    {`${value + comma}`}
                  </span>
                );
              } else {
                return (
                  <span style={{ color: style.numberColor || '#1A01CC', fontWeight: 'bold' }}>
                    {`${value + comma}`}
                  </span>
                );
              }
            }
            case 'null':
              return (
                <span style={{ color: style.numberColor || '#1A01CC', fontWeight: 'bold' }}>
                  {`null${comma}`}
                </span>
              );
            case 'array':
              return getJsonReactNode(value, comma, style);
            case 'string': {
              const json = checkJSONString(value);
              return json ? getJsonReactNode(json, comma, style) :
                (
                  <span style={{ color: style.stringColor || '#0B7500', wordWrap: 'break-word' }}>
                    {`"${value}"${comma}`}
                  </span>
                );
            }
            default:
              return (
                <span style={{ color: style.stringColor || '#0B7500', wordWrap: 'break-word' }}>
                  {`"${value}"${comma}`}
                </span>
              );
          }
        };
        return (
          <div key={index}>
            <span style={{ color: style.itemColor || 'black' }}>{`"${item}"`}</span>
            <span>: </span>
            <span>
              {
                handleValue()
              }
            </span>
          </div>
        );
      });
      const a = '{';
      const b = '}';
      return (
        <span>
          <span style={{ fontWeight: 'bold' }}>{a}</span>
          <div>
            <div style={{ paddingLeft: 24 }}>
              {kvArray}
            </div>
            <span style={{ fontWeight: 'bold' }}>{b}</span>
            { needComma ? ',' : '' }
          </div>
        </span>
      );
    } else {
      return <span>{'""'}</span>;
    }
  } else {
    return <span>{'""'}</span>;
  }
};
// java exception 字符串 格式化显示
const parseJavaException = (data) => {
  return data.split('\n').map((item, index) => {
    let res = item;
    if (item.indexOf('at ') === 1) {
      const temp = item.split(/\(|\)/gi);
      res = temp.map((i, x) => (
        x === 1 ? ['(', <a style={{ textDecoration: 'underline' }} key={`${index}.${x}`}>{i}</a>, ')'] : i
      ));
      return (<p style={{ whiteSpace: 'nowrap', textIndent: '4em' }} key={index}>{res}</p>);
    } else {
      if (item.indexOf('Caused by') >= 0) {
        const temp = item.split(':');
        res = temp.map((i, x) => {
          if (x === 0) {
            return [i, ':'];
          } else if (x === temp.length - 1) {
            return i;
          } else {
            return [<a style={{ textDecoration: 'underline' }} key={`${index}.${x}`}>{i}</a>, ':'];
          }
        });
      } else if (item.indexOf('Exception') > 0) {
        const temp = item.split(':');
        res = temp.map((i, x) => (
          x === 0 ? <a style={{ textDecoration: 'underline' }} key={`${index}.${x}`}>{i}</a> : `:${i}`
        ));
      } else {
        return (<p style={{ whiteSpace: 'nowrap', textIndent: '4em' }} key={index}>{res}</p>);
      }
      return (<p style={{ whiteSpace: 'nowrap' }} key={index}>{res}</p>);
    }
  });
};
// 获取字符串长度，中文算2个
const getStringLength = (stringData) => {
  const str = `${stringData}`;
  if (!str) return 0;
  let length = str.length;
  for (let i = 0; i < str.length; i += 1) {
    if (str.charCodeAt(i) > 255) length += 1;
  }
  return length;
};

export {
  typeOf,
  getRandomBetweenMaxAndMin,
  checkJSONString,
  getJsonReactNode,
  parseJavaException,
  getStringLength,
};
