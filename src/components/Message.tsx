import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export class Message {
    private key: string;
    private photoURL: string;
    private name: string;
    private date: string;
    private message: string;
    private userId: string;
    private isRight: boolean = false;

    constructor(key: string, photoURL: string, name: string, date: string, message: string, userId: string) {
        this.key = key;
        this.photoURL = photoURL;
        this.name = name;
        this.date = date;
        this.message = message;
        this.userId = userId;
    }

    private handleDelete = (key: string) => {
        this.isRight ? remove(ref(db, 'chat/' + key)) : alert("not available for deleting");
    };

    private setIsRight = (uId: string) => (uId === this.userId ? (this.isRight = true) : (this.isRight = false));

    public getMessage = (uId: string) => {
        this.setIsRight(uId);
        return (
            <Grid key={this.key} container justifyContent={this.isRight ? 'flex-end' : 'flex-start'}>
                <Card
                    elevation={2}
                    sx={{
                        width: { xs: '90%', sm: '75%', md: '50%' }, // デバイスに応じた幅
                        marginBottom: 1,
                        marginTop: 1,
                        borderRadius: 8,
                        display: 'flex', // Flexboxで整列
                        alignItems: 'center',
                        padding: 1,
                    }}
                >
                    <Avatar
                        alt={this.name}
                        src={this.photoURL}
                        sx={{ marginRight: 2 }}
                    />
                    <CardContent
                        sx={{
                            flexGrow: 1,
                            maxWidth: 'calc(100% - 120px)', // アバターとボタンを除く幅
                            wordBreak: 'break-word', // 長いテキストを折り返し
                            padding: 0,
                        }}
                    >
                        <Typography variant="body2" sx={{ color: 'text.secondary', marginBottom: 0.5 }}>
                            {`${this.name} (${this.date})`}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.secondary',
                                backgroundColor: this.isRight ? 'lightskyblue' : 'lightgray',
                                borderRadius: '20px',
                                padding: '10px 15px',
                                display: 'inline-block',
                                wordBreak: 'break-word',
                            }}
                        >
                            {this.message}
                        </Typography>
                    </CardContent>
                    <Tooltip title="Delete Message">
                        <IconButton onClick={() => this.handleDelete(this.key)}>
                            <DeleteOutlineIcon />
                        </IconButton>
                    </Tooltip>
                </Card>
            </Grid>
        );
    };
}
