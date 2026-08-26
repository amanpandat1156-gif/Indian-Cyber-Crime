import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, User, Search, LifeBuoy, ArrowRight, IndianRupee } from 'lucide-react';
import { IntentCardItem } from '../../data/intentCards';
import { useLanguage } from '../../context/LanguageContext';

interface IntentCardProps {
  item: IntentCardItem;
  className?: string;
}

const cardTranslationMap: Record<string, { titleKey: string; descKey: string }> = {
  'lost-money': { titleKey: 'card.lostMoney.title', descKey: 'card.lostMoney.desc' },
  'harassment-threats': { titleKey: 'card.harassment.title', descKey: 'card.harassment.desc' },
  'hacked-account': { titleKey: 'card.hacked.title', descKey: 'card.hacked.desc' },
  'report-anonymous': { titleKey: 'card.anonymous.title', descKey: 'card.anonymous.desc' },
  'verify-suspicious': { titleKey: 'card.verify.title', descKey: 'card.verify.desc' },
  'need-help': { titleKey: 'card.needHelp.title', descKey: 'card.needHelp.desc' },
};

export const IntentCard: React.FC<IntentCardProps> = ({ item, className = '' }) => {
  const { t } = useLanguage();

  const renderIcon = () => {
    switch (item.iconType) {
      case 'rupee':
        return <IndianRupee className="w-5 h-5 stroke-[2.2]" />;
      case 'shield':
        return <Shield className="w-5 h-5 stroke-[2]" />;
      case 'lock':
        return <Lock className="w-5 h-5 stroke-[2]" />;
      case 'user':
        return <User className="w-5 h-5 stroke-[2]" />;
      case 'search':
        return <Search className="w-5 h-5 stroke-[2]" />;
      case 'lifebuoy':
        return <LifeBuoy className="w-5 h-5 stroke-[2]" />;
      default:
        return null;
    }
  };

  const translatedTitle = cardTranslationMap[item.id]
    ? t(cardTranslationMap[item.id].titleKey, item.title)
    : item.title;
  const translatedDesc = cardTranslationMap[item.id]
    ? t(cardTranslationMap[item.id].descKey, item.description)
    : item.description;

  return (
    <Link
      to={item.href}
      className={`group flex flex-col justify-between p-4 sm:p-5 bg-white rounded-[10px] border border-[#DDE2E4] hover:border-[#12304A]/30 hover:shadow-[0_4px_12px_rgba(18,48,74,0.06)] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#12304A] ${className}`}
    >
      <div>
        {/* Icon Container with custom background */}
        <div className={`w-10 h-10 rounded-[8px] ${item.iconBg} ${item.iconColor} flex items-center justify-center mb-4 transition-transform group-hover:scale-105 duration-150`}>
          {renderIcon()}
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-bold text-[#12304A] leading-snug tracking-tight">
          {translatedTitle}
        </h3>

        {/* Description */}
        <p className="mt-2 text-[12.5px] text-[#5E6B73] leading-relaxed">
          {translatedDesc}
        </p>
      </div>

      {/* Arrow Indicator */}
      <div className="mt-5 pt-1 text-[#12304A]">
        <ArrowRight className="w-4 h-4 text-[#1C252C] group-hover:translate-x-1 transition-transform duration-150" />
      </div>
    </Link>
  );
};
