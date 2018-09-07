import React from 'react';
import BaseCard from './Card';
import BaseCardContainer from './CardContainer';

const Card = ({
    hover = 'lighten',
    href = null,
    className,
    onClick,
    children,
}) => (
    <BaseCard href={href} className={className} hover={hover} onClick={onClick}>
        {children}
    </BaseCard>
);

const CardContainer = ({ className, gap, layout = '112', children }) => (
    <BaseCardContainer className={className} gap={gap} layout={layout}>
        {children}
    </BaseCardContainer>
);
export default Card;

export { CardContainer };
