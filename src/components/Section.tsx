import React, { Component, useState, useContext } from 'react';
import { Row, Col, Divider, Layout, Card, Typography, Button } from 'antd';
import {
    PlusOutlined,
    FireOutlined
} from '@ant-design/icons';
import Field from './Field';
import { SECTION_TYPES } from '../config/global';
import { globalContext, GlobalContext, SectionData } from '../context/GlobalContextProvider';

const { Header, Sider, Content } = Layout;
const { Title, Paragraph } = Typography;

const Section = (props: { id: string }) => {

    const { id } = props;
    const [columnCount, setColumnCount] = useState(2);
    const [error, setError] = useState('');
    const context = useContext(globalContext) as GlobalContext;

    const generateColumnCards = (section: SectionData) => {
        return new Array(section.columnCount).fill(1).map((i, j) => {
            return (
                <Card key={j} title={`Column #${j + 1}`} style={{ marginBottom: '25px' }} extra={<Button type="primary" ghost block style={{ borderStyle: 'dashed' }}>< PlusOutlined /> Field</Button>}>
                    <Paragraph>
                        {JSON.stringify(section)}
                    </Paragraph>
                </Card>
            );
        })
    }

    const section = context.sections.find(section => section.id === context.activeSectionId);

    if (!section) return <></>;
    else
        return (
            <>
                <Row justify="space-between">
                    <Col>
                        <Title level={3}>{
                            section.name
                        }
                        </Title>
                    </Col>
                    <Col>
                        <Button type="primary" ghost block>< FireOutlined /> Populate example fields</Button>
                    </Col>
                </Row>
                <Divider />
                {generateColumnCards(section)}
            </>
        );
}

export default Section;