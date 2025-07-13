import styled from 'styled-components';

export const VirtualScrollContainer = styled.div`
  height: 600px;
  overflow-y: auto;
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

export const VirtualContentWrapper = styled.div<{ totalHeight: number }>`
  height: ${props => props.totalHeight}px;
  position: relative;
`;

export const VirtualItemsContainer = styled.div<{ translateY: number }>`
  transform: translateY(${props => props.translateY}px);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

export const VirtualTableContainer = styled.div`
  height: 600px;
  overflow-y: auto;
  position: relative;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
`;

export const EnhancedTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
`;

export const EnhancedTableHeader = styled.thead`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #f8f9fa;
`;

export const EnhancedTableHeaderRow = styled.tr`
  border-bottom: 2px solid #e0e0e0;
`;

export const EnhancedTableHeaderCell = styled.th<{
  align?: 'left' | 'center' | 'right';
  width?: string;
}>`
  padding: 16px 20px;
  text-align: ${props => props.align || 'left'};
  font-weight: 600;
  font-size: 14px;
  color: #374151;
  background-color: #f8f9fa;
  border-right: 1px solid #e5e7eb;
  width: ${props => props.width || 'auto'};

  &:last-child {
    border-right: none;
  }
`;

export const EnhancedTableBody = styled.tbody`
  background-color: #fff;
`;

export const EnhancedTableRow = styled.tr`
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #f9fafb;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const EnhancedTableCell = styled.td<{
  align?: 'left' | 'center' | 'right';
}>`
  padding: 16px 20px;
  text-align: ${props => props.align || 'left'};
  vertical-align: middle;
  font-size: 14px;
  color: #374151;
  border-right: 1px solid #f3f4f6;

  &:last-child {
    border-right: none;
  }
`;

export const VirtualTableContent = styled.div<{ translateY: number }>`
  position: absolute;
  top: ${props => props.translateY}px;
  left: 0;
  right: 0;
`;

export const VirtualTableInner = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const VirtualTableRowFixed = styled.tr`
  height: 60px;
  border-bottom: 1px solid #f3f4f6;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #f9fafb;
  }
`;

export const VirtualSpacerRow = styled.tr<{ totalHeight: number }>`
  height: ${props => props.totalHeight}px;
`;

export const VirtualSpacerCell = styled.td`
  padding: 0;
  border: none;
  position: relative;
`;

export const UserCardContainer = styled.div<{ minHeight?: string }>`
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  margin: 12px 8px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: ${props => props.minHeight || 'auto'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: #d1d5db;
  }
`;

export const UserCardHeader = styled.div`
  margin-bottom: 12px;
`;

export const UserCardName = styled.h3`
  margin: 0 0 6px 0;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
`;

export const UserCardEmail = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6b7280;
`;

export const UserCardRoleSection = styled.div`
  margin-bottom: 12px;
`;

export const UserCardFooter = styled.div`
  font-size: 12px;
  color: #9ca3af;
  padding-top: 8px;
  border-top: 1px solid #f3f4f6;
`;
