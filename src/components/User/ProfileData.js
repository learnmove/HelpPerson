import React from 'react'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

export default ({user})=>(
    <div>
        <Paper  elevation={1} style={{background:'#244865',padding:'30px'}}>
    <Typography variant="headline" component="p" style={{
        color:'#9FAFBB',
        whiteSpace: 'pre-line',
        textAlign: 'center',
        }}>
      {user.content}
    </Typography>
  
  </Paper>
  <Paper  elevation={1} style={{background:'#244865',padding:'50px'}}>
    <Typography component="h2" style={{
        color:'#FFFFFF',
        fontSize: '40px',
        textAlign: 'center',
        whiteSpace: 'pre-line',

        }}>
    專長
    </Typography>

  </Paper>
  <Paper  elevation={1} style={{background:'#244865',padding:'30px'}}>
    <Typography variant="headline" component="p" style={{
        color:'#9FAFBB',
        textAlign: 'center',
        }}>
   {user.profession}

    </Typography>
  
  </Paper>
  <Paper  elevation={1} style={{background:'#244865',padding:'50px'}}>
    <Typography component="h2" style={{
        color:'#FFFFFF',
        whiteSpace: 'pre-line',

        fontSize: '40px',
        textAlign: 'center',
        }}>
    經驗
    </Typography>

  </Paper>
  <Paper  elevation={1} style={{background:'#244865',padding:'30px'}}>
    <Typography variant="headline" component="p" style={{
        whiteSpace: 'pre-line',
        
        color:'#9FAFBB',
        textAlign: 'center',
        }}>
   {user.experience}
    </Typography>
  
  </Paper>
    </div>
)