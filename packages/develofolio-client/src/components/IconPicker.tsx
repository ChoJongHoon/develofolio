import React from "react";
import logos from "public/logos.json";
import Image from "next/image";
import styled from "styled-components";
import oc from "open-color";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid as Grid, GridChildComponentProps } from "react-window";

const ICON_SIZE = 40;

export default function IconPicker() {
  return (
    <Box>
      <Input />
      <GridWrapper>
        <AutoSizer defaultWidth={320}>
          {({ height, width }) => {
            const columnCount = Math.floor(width / ICON_SIZE);
            const rowCount = Math.ceil(logos.length / columnCount);

            return (
              <Grid
                height={height}
                width={width}
                columnCount={columnCount}
                columnWidth={ICON_SIZE}
                rowCount={rowCount}
                rowHeight={ICON_SIZE}
                itemData={{ columnCount }}
              >
                {Cell}
              </Grid>
            );
          }}
        </AutoSizer>
      </GridWrapper>
    </Box>
  );
}

type ItemData = { columnCount: number };

const Cell = ({
  columnIndex,
  data,
  rowIndex,
  style,
}: GridChildComponentProps<ItemData>) => {
  const { columnCount } = data;
  const singleColumnIndex = columnIndex + rowIndex * columnCount;
  const logo = logos[singleColumnIndex];
  return (
    <div style={style}>
      {logo && (
        <Item key={logo.name}>
          <Image
            key={logo.name}
            src={`/logos/${logo.files[0]}`}
            width={24}
            height={24}
            layout="fixed"
          />
        </Item>
      )}
    </div>
  );
};

const Box = styled.div`
  box-sizing: border-box;
  position: absolute;
  height: 276px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  padding: 8px;
  border: 1px solid ${oc.gray[2]};
  overflow: hidden;
  flex-direction: column;
  border-radius: 8px;
`;

const Input = styled.input`
  margin-bottom: 8px;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${oc.gray[1]};
  border: 1px solid ${oc.gray[2]};
`;

const GridWrapper = styled.div`
  flex: 1 1 0;
  min-height: 0px;
  overflow-y: auto;
  width: 320px;
`;

const Item = styled.button`
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;
  padding: 0px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  &:hover {
    background-color: ${oc.blue[1]};
  }
  &:focus {
    outline: none;
  }
`;
