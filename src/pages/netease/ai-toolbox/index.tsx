import React, { useState, ChangeEvent, useEffect } from 'react';
import { Input, Button } from 'antd';
import SiriusAiToolbox, { FuncTypes } from '@sirius/ai-toolbox';
import { decrypt, encrypt } from '@/util';
import styles from './index.module.scss';

const AiToolbox = () => {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<FuncTypes>('translate');
  const [draggable, setDraggable] = useState(true);
  const [tempInput, setTempInput] = useState('');
  const [externalInput, setExternalInput] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempInput(e.target.value);
  };

  const onActive = (type: FuncTypes) => {
    setActive(type);
    setVisible(true);
    setExternalInput(tempInput);
    setTempInput('');
  };

  const onClose = () => {
    setVisible(false);
    setActive('');
  };

  useEffect(() => {
    const obj = {
      timestamp: Date.now(),
      enterpriseId: 44442222
    };
    const objStr = JSON.stringify(obj);
    const key = 'f24e64ca4b179e1733df44806da8703d';
    // 被加密的JSON串：{"word":"hello"}，密钥 abc
    const encrypted = encrypt(objStr, key);
    console.log('secret encrypted', encrypted);
    // 密文：1K%2BmvMbTYirr1Qr%2B1zog7QGzHtJeaCgwiOMQnLEQDGZNDpJ%2BWBEy19KF9sWBWuEHGFSaaKZ0T2FIlHIVaPxoKg%3D%3D
    const decrypted = decrypt(encrypted, key);
    console.log('secret decrypted', decrypted);
    // 解密：{"word":"hello"}
  }, []);

  return (
    <div className={styles.aiToolbox}>
      <Input onChange={onChange} />
      <Button onClick={() => onActive('chat')}>Active Chat</Button>
      <Button onClick={() => onActive('translate')}>Active Translate</Button>
      <Button onClick={() => onActive('write')}>Active Write</Button>
      <Button onClick={() => onActive('refine')}>Active Refine</Button>
      <Button onClick={() => setDraggable(draggable => !draggable)}>Toggle Draggable</Button>
      <SiriusAiToolbox
        visible={visible}
        onClose={onClose}
        active={active}
        onActiveChange={setActive}
        draggable={draggable}
        externalInput={externalInput}
        // baseURL="https://waimao.cowork.netease.com"
      />
    </div>
  );
};

export default AiToolbox;
