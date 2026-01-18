'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const primaryNavItems = [
    { label: 'Ana Sayfa', href: '/homepage', icon: 'HomeIcon' },
    { label: 'Sigorta Ürünleri', href: '/insurance-products', icon: 'ShieldCheckIcon' },
    { label: 'Teklif Hesaplayıcı', href: '/quote-calculator', icon: 'CalculatorIcon' },
    { label: 'Müşteri Portalı', href: '/client-portal', icon: 'UserCircleIcon' },
  ];

  const secondaryNavItems = [
    { label: 'Bilgi Merkezi', href: '/knowledge-center', icon: 'BookOpenIcon' },
    { label: 'İletişim', href: '/contact', icon: 'PhoneIcon' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMoreMenuOpen(false);
  };

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  return (
    <header className={`w-full bg-background border-b border-border shadow-sm fixed top-0 left-0 right-0 z-50 ${className}`}>
      <div className="w-full px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/homepage" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-base">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg shadow-medical">
              <Icon name="ShieldCheckIcon" size={24} className="text-primary-foreground" variant="solid" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-primary leading-tight">TSS</span>
              <span className="text-xs text-text-secondary leading-tight">Sigorta Portalı</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-text-primary hover:text-primary hover:bg-primary-light rounded-md transition-all duration-base"
              >
                <Icon name={item.icon as any} size={18} className="text-current" />
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="relative">
              <button
                onClick={toggleMoreMenu}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-text-primary hover:text-primary hover:bg-primary-light rounded-md transition-all duration-base"
              >
                <Icon name="EllipsisHorizontalIcon" size={18} className="text-current" />
                <span>Daha Fazla</span>
                <Icon 
                  name="ChevronDownIcon" 
                  size={16} 
                  className={`text-current transition-transform duration-base ${isMoreMenuOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {isMoreMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg overflow-hidden">
                  {secondaryNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMoreMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-popover-foreground hover:bg-muted transition-colors duration-base"
                    >
                      <Icon name={item.icon as any} size={18} className="text-text-secondary" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/quote-calculator"
              className="px-6 py-2.5 bg-healthcare-green text-healthcare-green-foreground font-medium text-sm rounded-lg hover:bg-opacity-90 shadow-sm hover:shadow-md transition-all duration-base pulse-rhythm"
            >
              Hemen Teklif Al
            </Link>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-text-primary hover:text-primary hover:bg-primary-light rounded-md transition-all duration-base"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-surface border-t border-border shadow-lg">
          <nav className="px-4 py-4 space-y-1">
            {[...primaryNavItems, ...secondaryNavItems].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-text-primary hover:text-primary hover:bg-primary-light rounded-lg transition-all duration-base"
              >
                <Icon name={item.icon as any} size={20} className="text-current" />
                <span>{item.label}</span>
              </Link>
            ))}
            <Link
              href="/quote-calculator"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center w-full px-4 py-3 mt-4 bg-healthcare-green text-healthcare-green-foreground font-medium text-sm rounded-lg hover:bg-opacity-90 shadow-sm transition-all duration-base"
            >
              Hemen Teklif Al
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;