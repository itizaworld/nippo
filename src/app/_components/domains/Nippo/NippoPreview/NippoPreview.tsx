import './styles.scss';
import parse from 'html-react-parser';
import { FC } from 'react';

import { Nippo } from '~/domains/Nippo';

type Props = {
  nippo?: Nippo;
};

export const NippoPreview: FC<Props> = ({ nippo }) => {
  return (
    <div className="preview" style={{ background: 'white', padding: '16px', border: '1px solid hsl(210, 18%, 87%)', borderRadius: '8px' }}>
      {nippo?.body ? parse(nippo?.body) : 'まだ振り返りがありません'}
    </div>
  );
};
