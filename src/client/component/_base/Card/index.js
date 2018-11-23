import React, { PureComponent } from 'react';
import BaseCard from './Card';
import BaseCardContainer from './CardContainer';

class Card extends PureComponent {
    render() {
        const {
            hover = 'opacity',
            href = null,
            className,
            onClick,
            children,
        } = this.props;
        return (
            <BaseCard
                href={href}
                className={className}
                hover={hover}
                onClick={onClick}
            >
                {children}
            </BaseCard>
        );
    }
}

class CardContainer extends PureComponent {
    render() {
        const {
            className,
            gap,
            layout = '112',
            slice,
            line,
            step,
            children,
        } = this.props;
        return (
            <BaseCardContainer
                className={className}
                gap={gap}
                slice={slice}
                line={line}
                step={step}
                layout={layout}
            >
                {children}
            </BaseCardContainer>
        );
    }
}
export default Card;

export { CardContainer };
